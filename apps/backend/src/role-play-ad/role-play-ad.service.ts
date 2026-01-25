import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAd } from 'src/DTOs/CreateAd.dto';
import { RolePlayAd, RolePlayAdDocument } from 'src/schemas/RolePlayAd';
import { User, UserDocument } from 'src/schemas/User';
import { UserPayload } from 'src/types';

@Injectable()
export class RolePlayAdService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
  ) {}

  async createAd(createAdDto: CreateAd, user: UserPayload) {
    const { title, pov, isAdult, premise, writingExpectations, contentNotes } =
      createAdDto;

    const createdAd = await this.rolePlayAdModel.create({
      title,
      pov,
      adultRoleplay: isAdult,
      premise,
      writingExpectations,
      contentNotes,
      author: user._id,
    });

    await this.userModel.findByIdAndUpdate(user._id, {
      $addToSet: { rolePlayAds: createdAd._id },
    });
  }
}
