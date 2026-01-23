import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/schemas/User';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  async googleAuth(token: string): Promise<{ jwtToken: string }> {
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
        email: userRecord.email,
        password: Math.random().toString(36).slice(-8),
      });
      await user.save();
    }

    const jwtToken = this.jwtService.sign({
      id: user._id,
    });

    return { jwtToken };
  }

  signOut(res: Response): { message: string } {
    res.clearCookie('auth-session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'success' };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }
}
