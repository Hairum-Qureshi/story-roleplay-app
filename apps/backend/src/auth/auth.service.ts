import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/User';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types';
import { generateUsername } from 'unique-username-generator';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('GoogleOAuthClient') private googleOAuthClient: OAuth2Client,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
    };
  }

  async googleAuth(token: string): Promise<{ jwtToken: string }> {
    const ticket = await this.googleOAuthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const { email, picture, given_name, family_name } =
      ticket.getPayload() || {};

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        _id: crypto.randomUUID(),
        firstName: given_name || 'GoogleUser',
        lastName: family_name || 'GoogleUser',
        username: generateUsername('', 2, 19),
        email,
        profilePicture: picture,
      });
      await user.save();
    }

    const jwtToken = this.jwtService.sign({
      _id: user._id,
    });

    return { jwtToken };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }

  async discordAuth(code: string): Promise<{ jwtToken: string }> {
    const formData = new URLSearchParams();
    formData.append(
      'client_id',
      this.configService.get<string>('DISCORD_CLIENT_ID') || '',
    );
    formData.append(
      'client_secret',
      this.configService.get<string>('DISCORD_CLIENT_SECRET') || '',
    );
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append(
      'redirect_uri',
      this.configService.get<string>('DISCORD_REDIRECT_URI') || '',
    );

    const response = await firstValueFrom(
      this.httpService.post(
        'https://discord.com/api/v10/oauth2/token',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    if (!response.data)
      throw new HttpException('Failed to get Discord access token', 500);

    const accessToken = response.data.access_token;
    const userInfo = await firstValueFrom(
      this.httpService.get('https://discord.com/api/v10/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    const { id, username, avatar, email, global_name } = userInfo.data;

    let user = await this.userModel.findOne({ email });

    if (user) {
      const jwtToken = this.jwtService.sign({
        _id: user._id,
      });

      return { jwtToken };
    }

    user = new this.userModel({
      _id: id,
      firstName: global_name || 'DiscordUser',
      username,
      email,
      profilePicture: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
    });
    await user.save();

    const jwtToken = this.jwtService.sign({
      _id: user._id,
    });

    return { jwtToken };
  }
}
