import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/schemas/User';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/types';
import { generateUsername } from 'unique-username-generator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  private createCookieWithJwtToken(jwtToken: string, res: Response) {
    res.cookie('auth-session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
  }

  getAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
    };
  }

  async googleAuth(
    token: string,
    res: Response,
  ): Promise<{ jwtToken: string }> {
    const payload = await this.firebase.auth().verifyIdToken(token);
    const payloadUID: string = payload.uid;
    const userRecord = await this.firebase.auth().getUser(payloadUID);

    let user = await this.userModel.findOne({ email: userRecord.email });

    if (!user) {
      user = new this.userModel({
        _id: payloadUID,
        firstName: userRecord.displayName?.split(' ')[0] || 'GoogleUser',
        lastName: userRecord.displayName
          ? userRecord.displayName.split(' ').slice(1).join(' ')
          : 'GoogleUser',
        username: generateUsername('', 2, 19),
        email: userRecord.email,
        profilePicture: userRecord.photoURL,
      });
      await user.save();
    }

    const jwtToken = this.jwtService.sign({
      _id: user._id,
    });

    this.createCookieWithJwtToken(jwtToken, res);

    return { jwtToken };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }
}
