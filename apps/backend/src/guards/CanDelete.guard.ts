import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePlayAd, RolePlayAdDocument } from '../schemas/RolePlayAd';
import { UserPayload } from 'src/types';
import Role from 'src/enums/roles.enum';

@Injectable()
export class CanDeleteGuard implements CanActivate {
  constructor(
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserPayload = request.user;
    const adID = request.params.adID;

    const rolePlayAd: RolePlayAdDocument | null =
      await this.rolePlayAdModel.findById(adID);

    if (!rolePlayAd) {
      throw new NotFoundException('Ad not found');
    }

    if (
      rolePlayAd.author.toString() !== user._id ||
      (user.role !== Role.ADMIN && user.role !== Role.MODERATOR)
    ) {
      throw new ForbiddenException('You do not own this ad');
    }

    return true;
  }
}
