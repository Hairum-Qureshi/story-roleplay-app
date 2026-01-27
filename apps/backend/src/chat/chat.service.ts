import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from 'src/schemas/inbox/Conversation';
import { RolePlayAd } from 'src/schemas/RolePlayAd';
import type {
  UserPayload,
  ConversationDocument,
  RolePlayAd as RolePlayAdInterface,
} from 'src/types';
import { User, UserDocument } from 'src/schemas/User';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdInterface>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createConversation(
    adID: string,
    user: UserPayload,
  ): Promise<{
    conversation: ConversationDocument;
    rolePlayAd: RolePlayAdInterface;
  }> {
    // first need to check whether the user has a conversation with this exact ad already
    const existingConversation: ConversationDocument | null =
      await this.conversationModel.findOne({
        ad: adID,
        participants: user._id,
      });

    // get the ad data:
    const ad: RolePlayAdInterface | null =
      await this.rolePlayAdModel.findById(adID);
    if (!ad) {
      throw new Error('Role Play Ad not found');
    }

    // if the ad poster is you, prevent conversation creation
    if (ad.author === user._id) {
      throw new Error('Cannot create a conversation with your own ad');
    }

    if (existingConversation) {
      // if they do, return the existing conversation
      return { conversation: existingConversation, rolePlayAd: ad };
    }

    // if not, create a new conversation

    // create the conversation with the ad and the user as participants

    const newConversation: ConversationDocument =
      await this.conversationModel.create({
        title: ad.title,
        roleplayAd: ad._id,
        participants: [user._id, ad.author],
        messages: [],
      });

    // update both users' conversation arrays
    await this.userModel.findByIdAndUpdate(user._id, {
      $addToSet: { conversations: newConversation._id },
    });

    await this.userModel.findByIdAndUpdate(ad.author, {
      $addToSet: { conversations: newConversation._id },
    });

    return { conversation: newConversation, rolePlayAd: ad };
  }

  async getAllConversations(user: UserPayload) {
    // TODO - may need to alter returned data structure here later
    return await this.conversationModel.find({
      participants: user._id,
    });
  }
}
