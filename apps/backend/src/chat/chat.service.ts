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
import { Message } from 'src/schemas/inbox/Message';
import type { Message as MessageInterface } from 'src/types';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(RolePlayAd.name)
    private rolePlayAdModel: Model<RolePlayAdInterface>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async createConversation(
    adID: string,
    user: UserPayload,
  ): Promise<{
    conversation: ConversationDocument;
    rolePlayAd: RolePlayAdInterface;
  }> {
    // get the ad data:
    const ad: RolePlayAdInterface | null =
      await this.rolePlayAdModel.findById(adID);

    if (!ad) {
      throw new Error('Role Play Ad not found');
    }

    // first need to check whether the user has a conversation with this exact ad already
    const existingConversation: ConversationDocument | null =
      await this.conversationModel.findOne({
        roleplayAd: ad._id,
        title: ad.title,
        participants: {
          $all: [user._id, ad.author],
        },
      });

    if (existingConversation) {
      // if they do, return the existing conversation
      return { conversation: existingConversation, rolePlayAd: ad };
    }

    // if the ad poster is you, prevent conversation creation
    if (ad.author === user._id) {
      throw new Error('Cannot create a conversation with your own ad');
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

    // create a welcome message from SYSTEM to both users
    const message: MessageInterface = await this.messageModel.create({
      sender: '000000000000000000000001', // SYSTEM user ID
      conversation: newConversation._id,
      content: `<p>A role-play chat has been started between you and ${user.username}. Optionally, before you start role-playing, you can select an existing character from above or <a href = "/new-character">create a new one</a> to share with your role-play partner.</p>`,
    });

    // update conversation model with the message ID
    await this.conversationModel.findByIdAndUpdate(newConversation._id, {
      $push: { messages: message._id },
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
    return await this.conversationModel
      .find({
        participants: user._id,
      })
      .populate({
        path: 'participants',
        select: 'username profilePicture',
      })
      .populate({
        path: 'messages',
        select: 'sender content',
        populate: {
          path: 'sender',
          select: 'username profilePicture',
        },
      })
      .populate({
        path: 'roleplayAd',
        select: '-__v',
        populate: {
          path: 'author',
          select: 'username profilePicture',
        },
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
