import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/User';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types';
import { generateUsername } from 'unique-username-generator';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('GoogleOAuthClient') private googleOAuthClient: OAuth2Client,
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

    const { email, name, picture, given_name, family_name } =
      ticket.getPayload() || {};

    console.log({
      email,
      name,
      picture,
      given_name,
      family_name,
    });

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
}
