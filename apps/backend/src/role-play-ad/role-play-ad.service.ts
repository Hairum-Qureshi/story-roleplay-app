import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAd } from '../DTOs/CreateAd.dto';
import { EventsGateway } from '../events/events.gateway';
import { RolePlayAd, RolePlayAdDocument } from '../schemas/RolePlayAd';
import { User, UserDocument } from '../schemas/User';
import { ConversationDocument, Message, UserPayload } from '../types';
import { Conversation } from '../schemas/inbox/Conversation';
import { ChatService } from '../chat/chat.service';
import mongoose from 'mongoose';

@Injectable()
export class RolePlayAdService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
    private readonly eventsGateway: EventsGateway,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    private readonly chatService: ChatService,
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

  async editAd(adID: string, editAdDto: CreateAd, user: UserPayload) {
    const { title, pov, isAdult, premise, writingExpectations, contentNotes } =
      editAdDto;

    // need to update the title property of the conversation Model
    const updatedConversation: ConversationDocument =
      (await this.conversationModel.findOneAndUpdate(
        { roleplayAd: new mongoose.Types.ObjectId(adID) },
        {
          title,
        },
        { new: true },
      )) as unknown as ConversationDocument;

    if (updatedConversation) {
      const SYSTEM_MESSAGE = `@${user.username} has made a change to their role-play ad. The role-play ad "${editAdDto.title}" has been updated.`;

      const message: Message = await this.chatService.createSystemMessage(
        updatedConversation._id,
        SYSTEM_MESSAGE,
      );

      updatedConversation.messages.push(
        new mongoose.Types.ObjectId(message._id),
      );
      await updatedConversation.save();

      this.eventsGateway.emitSystemMessage(
        updatedConversation.participants,
        message,
      );
    }

    // TODO - send this update to all connected clients in the conversation

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
      .find({ author: user._id, isDeleted: { $ne: true } })
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
    // ! there seems to be an issue where if you repost more than 1 ad, then the frontend UI appears to duplicate the ad more than once unless you refresh the page
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
    return await this.rolePlayAdModel.findById(adID).populate({
      path: 'author',
      select: 'username profilePicture',
    });
  }

  async repostAd(adID: string) {
    const ad: RolePlayAdDocument =
      (await this.rolePlayAdModel.findByIdAndUpdate(adID, {
        createdAt: new Date(),
      })) as unknown as RolePlayAdDocument;

    this.eventsGateway.emitNewAd(ad);
  }
}
