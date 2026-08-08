import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User';

@Injectable()
export class ModerationGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userID = context.switchToHttp().getRequest().user._id;
    const user = await this.userModel.findById(userID);

    if (!user) throw new NotFoundException('User not found');

    if (
      user.moderation.status === 'BANNED' ||
      user.moderation.status === 'SUSPENDED'
    ) {
      throw new ForbiddenException('User is banned or suspended');
    }

    return true;
  }
}
