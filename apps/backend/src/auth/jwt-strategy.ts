import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User, UserDocument } from 'src/schemas/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['auth-session'],
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { id: string; sub: string }) {
    const { id } = payload;
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UnauthorizedException('Please log in first');
    }
    return user;
  }
}
