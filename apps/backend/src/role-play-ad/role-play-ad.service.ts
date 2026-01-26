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

  async getAllAds() {
    const ONE_HOUR = 60 * 60 * 1000;

    return await this.rolePlayAdModel
      .find({
        createdAt: { $gte: new Date(Date.now() - ONE_HOUR) }, // only retrieves ads that are less than an hour old
      })
      .populate({
        path: 'author',
        select: 'username profilePicture',
      })
      .select('-__v')
      .sort({ createdAt: -1 });
  }
}
