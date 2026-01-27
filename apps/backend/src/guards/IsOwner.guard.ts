import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePlayAd, RolePlayAdDocument } from 'src/schemas/RolePlayAd';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const adID = request.params.adID;

    const rolePlayAd: RolePlayAdDocument | null =
      await this.rolePlayAdModel.findById(adID);

    if (!rolePlayAd) {
      throw new NotFoundException('Ad not found');
    }

    if (rolePlayAd.author !== user._id) {
      throw new ForbiddenException('You do not own this ad');
    }

    return true;
  }
}
