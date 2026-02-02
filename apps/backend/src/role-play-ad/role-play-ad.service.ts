import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAd } from 'src/DTOs/CreateAd.dto';
import { EventsGateway } from 'src/events/events.gateway';
import { RolePlayAd, RolePlayAdDocument } from 'src/schemas/RolePlayAd';
import { User, UserDocument } from 'src/schemas/User';
import { UserPayload } from 'src/types';
import { Conversation } from 'src/schemas/inbox/Conversation';

@Injectable()
export class RolePlayAdService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
    private readonly eventsGateway: EventsGateway,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async createAd(createAdDto: CreateAd, user: UserPayload) {
    const { title, pov, isAdult, premise, writingExpectations, contentNotes } =
      createAdDto;

    const createdAd: RolePlayAdDocument = await this.rolePlayAdModel.create({
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

    this.eventsGateway.emitNewAd(createdAd);
  }

  async editAd(adID: string, editAdDto: CreateAd) {
    const { title, pov, isAdult, premise, writingExpectations, contentNotes } =
      editAdDto;

    return await this.rolePlayAdModel.findByIdAndUpdate(adID, {
      title,
      pov,
      adultRoleplay: isAdult,
      premise,
      writingExpectations,
      contentNotes,
    });
  }

  async getPostedAdsByUser(
    user: UserPayload,
  ): Promise<(RolePlayAd & { canBeReposted: boolean })[]> {
    const ads = await this.rolePlayAdModel
      .find({ author: user._id })
      .populate({
        path: 'author',
        select: 'username profilePicture',
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();

    const ONE_HOUR = 1000 * 60 * 60;
    const now = Date.now();

    return ads.map((ad) => ({
      ...ad,
      canBeReposted: now - new Date(ad.createdAt).getTime() >= ONE_HOUR,
    })) as unknown as (RolePlayAd & { canBeReposted: boolean })[];
  }

  async getAllAds() {
    const ONE_HOUR = 60 * 60 * 1000;

    return await this.rolePlayAdModel
      .find({
        createdAt: {
          $gte: new Date(Date.now() - ONE_HOUR),
        },
        isDeleted: { $ne: true }, // only retrieves ads that are less than an hour old and not set to deleted
      })
      .populate({
        path: 'author',
        select: 'username profilePicture',
      })
      .select('-__v')
      .sort({ createdAt: -1 });
  }

  async deleteAd(adID: string) {
    // first we need to check if this ad belongs in any conversations
    const conversationsWithAd = await this.conversationModel.find({
      roleplayAd: adID,
    });

    if (conversationsWithAd.length > 0) {
      // if so, we set isDeleted to true instead of deleting it
      await this.rolePlayAdModel.findByIdAndUpdate(adID, {
        isDeleted: true,
      });
    } else {
      // if it doesn't exist in ANY conversations, we can delete it outright
      await this.rolePlayAdModel.findByIdAndDelete(adID);
    }
  }

  async getAdByID(adID: string) {
    return await this.rolePlayAdModel.findById(adID);
  }

  async repostAd(adID: string) {
    const ad: RolePlayAdDocument =
      (await this.rolePlayAdModel.findByIdAndUpdate(adID, {
        createdAt: new Date(),
      })) as unknown as RolePlayAdDocument;

    this.eventsGateway.emitNewAd(ad);
  }
}
