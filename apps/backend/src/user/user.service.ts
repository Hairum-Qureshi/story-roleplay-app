import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterBio, CharacterBioDocument } from '../schemas/CharacterBio';
import { RolePlayAd, RolePlayAdDocument } from '../schemas/RolePlayAd';
import { User, UserDocument } from '../schemas/User';
import {
  Conversation,
  ConversationDocument,
} from '../schemas/inbox/Conversation';
import type { Conversation as ConversationInterface } from '../types';
import { ChatService } from '../chat/chat.service';
import Role from '../enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(CharacterBio.name)
    private characterBioModel: Model<CharacterBioDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private readonly chatService: ChatService,
  ) {}

  async deleteUserById(userId: string, userRole: Role) {
    if (userRole === 'admin') {
      throw new HttpException('Admins cannot delete their accounts', 403);
    }

    await this.userModel.findByIdAndUpdate(userId, {
      _id: `${userId}`,
      email: `deleted_user_${userId.slice(-6)}@deleted.com`,
      firstName: null,
      lastName: null,
      username: `deleted_user_${userId.slice(-6)}`,
      profilePicture: '-',
      isDeleted: true,
      characterBios: [],
      rolePlayAds: [],
    });

    // first need to check if any of the user's character bios are attached to ongoing conversations
    const conversationsWithUserBios: ConversationDocument[] =
      await this.conversationModel.find({
        characterBios: {
          $in: await this.characterBioModel.find({ author: userId }),
        },
      });

    if (conversationsWithUserBios.length > 0) {
      const biosInUse = conversationsWithUserBios.flatMap(
        (conversation: Conversation) => conversation.characterBios,
      );

      await this.characterBioModel.updateMany(
        { _id: { $in: biosInUse } },
        { isDeleted: true },
      );
    } else {
      // if not, delete them since they're not used anywhere
      await this.characterBioModel.deleteMany({ author: userId });
    }

    // second need to check if any of the user's ads are attached to ongoing conversations
    // if so, set isDeleted to true for those ads
    const conversationsWithUserAds: ConversationDocument[] =
      await this.conversationModel.find({
        roleplayAd: {
          $in: await this.rolePlayAdModel.find({ author: userId }),
        },
      });

    if (conversationsWithUserAds.length > 0) {
      const adsInUse = conversationsWithUserAds.map(
        (conversation) =>
          (conversation as unknown as ConversationInterface).roleplayAd,
      );

      await this.rolePlayAdModel.updateMany(
        { _id: { $in: adsInUse } },
        { isDeleted: true },
      );
    } else {
      // if not, delete them since they're not used anywhere
      await this.rolePlayAdModel.deleteMany({ author: userId });
    }

    if (!conversationsWithUserAds.length && !conversationsWithUserBios.length) {
      // if none of the user's ads or bios are attached to any conversations, we can delete them all
      await this.characterBioModel.deleteMany({ author: userId });
      await this.rolePlayAdModel.deleteMany({ author: userId });
    }
  }

  async blockUser(currUserID: string, targetUserId: string) {
    // ensure the current user is not blocking themself
    if (currUserID === targetUserId)
      throw new HttpException('You cannot block yourself', 400);

    // check if the targetUserID is valid
    const validUser = await this.userModel.findById(targetUserId);

    const conversationsWithUser: ConversationInterface[] =
      await this.conversationModel.find({
        participants: { $all: [currUserID, targetUserId] },
      });

    if (!validUser) throw new NotFoundException('User not found');

    // block the user
    await this.userModel.findByIdAndUpdate(currUserID, {
      $addToSet: { blockedUsers: targetUserId },
    });

    // check if the user has any existing conversations with the user and if so, end the conversations:
    if (!conversationsWithUser.length) return;

    for (const conversation of conversationsWithUser) {
      await this.chatService.endConversation(conversation._id.toString());
    }
  }

  async unblockUser(currUserID: string, targetUserID: string) {
    // check if the targetUserID is valid
    const validUser = await this.userModel.findById(targetUserID);

    if (!validUser) throw new NotFoundException('User not found');

    // check if the user is actually blocked by the current user
    const isBlocked = !!(await this.userModel.findOne({
      _id: currUserID,
      blockedUsers: targetUserID,
    }));

    if (!isBlocked) throw new HttpException('User is not blocked', 400);

    // unblock the user
    await this.userModel.findByIdAndUpdate(currUserID, {
      $pull: { blockedUsers: targetUserID },
    });
  }

  async getBlockedUsers(currUserID: string) {
    const user = await this.userModel.findById(currUserID).populate({
      path: 'blockedUsers',
      select: 'username profilePicture',
    });

    return user?.blockedUsers;
  }

  async getAllUsers() {
    type TestUser = {
      _id: string;
      email: string;
      username: string;
      profilePicture: string;
      role: Role;
      moderation: {
        status: string;
        reason: string;
        expiresAt: Date | null;
      };
    };

    return this.userModel
      .find({
        isDeleted: { $ne: true },
      })
      .select('username _id email role profilePicture moderation')
      .lean();
  }
}
