import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterBio, CharacterBioDocument } from 'src/schemas/CharacterBio';
import { RolePlayAd, RolePlayAdDocument } from 'src/schemas/RolePlayAd';
import { User, UserDocument } from 'src/schemas/User';
import * as admin from 'firebase-admin';
import {
  Conversation,
  ConversationDocument,
} from 'src/schemas/inbox/Conversation';
import type { Conversation as ConversationInterface } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(CharacterBio.name)
    private characterBioModel: Model<CharacterBioDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdDocument>,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async deleteUserById(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      _id: `${userId}`,
      email: `deleted_user_${userId.slice(-6)}@deleted.com`,
      firstName: null,
      lastName: null,
      username: `deleted_user_${userId.slice(-6)}`,
      profilePicture: `${process.env.BACKEND_URL}/assets/deleted-user-pfp.jpg`,
      characterBios: [],
      rolePlayAds: [],
    });

    // delete the email from Firebase
    await this.firebase.auth().deleteUser(userId);

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

    if (
      conversationsWithUserAds.length === 0 &&
      conversationsWithUserBios.length === 0
    ) {
      // if none of the user's ads or bios are attached to any conversations, we can delete them all
      await this.characterBioModel.deleteMany({ author: userId });
      await this.rolePlayAdModel.deleteMany({ author: userId });
    }
  }
}
