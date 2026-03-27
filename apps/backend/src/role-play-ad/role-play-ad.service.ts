import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAd } from '../DTOs/CreateAd.dto';
import { EventsGateway } from '../events/events.gateway';
import { RolePlayAd, RolePlayAdDocument } from '../schemas/RolePlayAd';
import { User, UserDocument } from '../schemas/User';
import { ConversationDocument, Message, UserPayload } from '../types';
import { Conversation } from '../schemas/inbox/Conversation';
import { ChatService } from '../chat/chat.service';
import mongoose from 'mongoose';
import { Like } from 'src/schemas/Like';
import { RolePlayAd as RolePlayAdType } from '../types';

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
    @InjectModel(Like.name) private likeModel: Model<Like>,
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
        { roleplayAd: new Types.ObjectId(adID) },
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

  async getAllAds(userID: string) {
    // ! there seems to be an issue where if you repost more than 1 ad, then the frontend UI appears to duplicate the ad more than once unless you refresh the page
    const ONE_HOUR = 60 * 60 * 1000;

    const allAds: RolePlayAdDocument[] = (await this.rolePlayAdModel
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
      .sort({ createdAt: -1 })) as unknown as RolePlayAdDocument[];

    const allAdsJSON: RolePlayAdType[] = await Promise.all(
      allAds.map(async (ad) => {
        const adObj = ad.toObject();
        return {
          ...adObj,
          isLiked: await this.getAdByID(ad._id.toString(), userID).then(
            (ad) => ad.isLiked,
          ),
        };
      }),
    );

    return allAdsJSON;
  }

  async deleteAd(adID: string, user: UserPayload) {
    // first we need to check if this ad belongs in any conversations
    const conversationsWithAd = await this.conversationModel.find({
      roleplayAd: new Types.ObjectId(adID), // needs to be converted to ObjectId type to properly query the conversation collection
    });

    if (conversationsWithAd.length > 0) {
      // if so, we set isDeleted to true instead of deleting it
      await this.rolePlayAdModel.findByIdAndUpdate(adID, {
        isDeleted: true,
      });

      const conversationPromises = conversationsWithAd.map(
        async (conversation: ConversationDocument) => {
          const SYSTEM_MESSAGE = `This message is to notify everyone that the author of this ad, @${user.username}, has deleted this ad. However, you can still continue the role-play as normal.`;

          const message: Message = await this.chatService.createSystemMessage(
            conversation._id,
            SYSTEM_MESSAGE,
          );

          conversation.messages.push(new Types.ObjectId(message._id));
          await conversation.save();

          this.eventsGateway.emitSystemMessage(
            conversation.participants,
            message,
          );
        },
      );

      await Promise.all(conversationPromises);
    } else {
      // if it doesn't exist in ANY conversations, we can delete it outright
      await this.rolePlayAdModel.findByIdAndDelete(adID);

      // delete all likes associated with this ad as well
      await this.likeModel.deleteMany({ rolePlayAd: new Types.ObjectId(adID) });
    }
  }

  async getAdByID(adID: string, userID: string): Promise<RolePlayAdType> {
    const adDoc: RolePlayAdDocument = (await this.rolePlayAdModel
      .findById(adID)
      .populate({
        path: 'author',
        select: 'username profilePicture',
      })) as unknown as RolePlayAdDocument;

    if (!adDoc || adDoc.isDeleted) {
      throw new NotFoundException('Role-play ad not found');
    }

    const ad: RolePlayAdType = adDoc.toObject();

    const isLiked = await this.likeModel.find({ adID, userID });

    ad.isLiked = isLiked.length > 0;

    return ad;
  }

  async repostAd(adID: string) {
    const ad: RolePlayAdDocument =
      (await this.rolePlayAdModel.findByIdAndUpdate(adID, {
        createdAt: new Date(),
      })) as unknown as RolePlayAdDocument;

    this.eventsGateway.emitNewAd(ad);
  }

  async likeAd(adID: string, userID: string) {
    // add check where if the ad is flagged as like, nothing happens
    const roleplayAd = await this.rolePlayAdModel.findById(adID);

    if (!roleplayAd || roleplayAd.isDeleted) {
      throw new NotFoundException('Role-play ad not found');
    }

    // check if the user has already liked the ad
    const existingLike = await this.likeModel.findOne({
      userID,
      adID,
    });

    if (!existingLike) {
      await this.likeModel.create({
        userID,
        adID,
      });
    }
  }

  async unlikeAd(adID: string, userID: string) {
    // add check where if the ad is not flagged as like, nothing happens
    const roleplayAd: RolePlayAdDocument | undefined =
      (await this.likeModel.findOne({
        adID,
        userID,
      })) as unknown as RolePlayAdDocument | undefined;

    if (!roleplayAd || roleplayAd.isDeleted) {
      throw new NotFoundException('Role-play ad not found');
    }

    await this.likeModel.findOneAndDelete({
      userID,
      adID,
    });
  }

  async getLikedAds(userID: string) {
    const likedAds = await this.likeModel
      .find({ userID })
      .populate({
        path: 'adID',
        match: { isDeleted: { $ne: true } }, // only include ads not deleted
        populate: {
          path: 'author',
          select: 'username profilePicture',
        },
      })
      .select('-_id -userID -__v');

    return likedAds;
  }
}
