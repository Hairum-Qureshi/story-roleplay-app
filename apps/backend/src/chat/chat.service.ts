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
import { CreateMessage } from 'src/DTOs/CreateMessage.dto';
import type { MessageDocument } from 'src/types';
import { EventsGateway } from 'src/events/events.gateway';
import { EditMessage } from 'src/DTOs/EditMessage.dto';
import { Types } from 'mongoose';

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
    private readonly eventsGateway: EventsGateway,
  ) {}

  private async reAddConversationToUserList(
    chatID: Types.ObjectId,
    userID: string,
  ) {
    await this.userModel.findByIdAndUpdate(userID, {
      $addToSet: { conversations: chatID },
    });

    await this.conversationModel.findByIdAndUpdate(chatID, {
      $pull: { hiddenFor: userID },
    });
  }

  async createConversationMessage(
    chatID: string,
    messageDto: CreateMessage,
    user: UserPayload,
  ): Promise<{
    message: MessageInterface;
    chatID: Types.ObjectId;
  }> {
    // first get the chat data by ID
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const participants: string[] = conversation.participants;

    // validate that the user is a participant in the chat
    if (!participants.includes(user._id)) {
      throw new Error('User is not a participant in this conversation');
    }

    // create the message
    const message: MessageDocument = await this.messageModel.create({
      sender: user._id,
      conversation: conversation._id,
      content: messageDto.message,
    });

    conversation.latestMessage = messageDto.message;
    conversation.latestMessageAt = new Date();
    await conversation.save();

    await message.populate('sender', 'username profilePicture');

    // update the conversation's messages array with that message ID
    await this.conversationModel.findByIdAndUpdate(conversation._id, {
      $push: { messages: message._id },
    });

    const otherParticipantID: string = participants.find(
      (participantID) => participantID !== user._id,
    ) as string;

    // re-add the conversation to the other participant's list of conversations if it doesn't exist but need to first check if they have it

    if (conversation.hiddenFor.length > 0) {
      // if the conversation is hidden for any users, we need to re-add it to their list
      for (const hiddenUserID of conversation.hiddenFor) {
        await this.reAddConversationToUserList(conversation._id, hiddenUserID);
      }
    }

    this.eventsGateway.sendMessageToUser(otherParticipantID, message);

    return {
      message,
      chatID: conversation._id,
    };
  }

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

      if (existingConversation.hiddenFor.includes(user._id)) {
        // if the existing conversation is hidden for the user, re-add it to their list
        await this.reAddConversationToUserList(
          existingConversation._id,
          user._id,
        );
      }

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
    // TODO - need to rethink this logic
    const message: MessageInterface = await this.messageModel.create({
      sender: '000000000000000000000001', // SYSTEM user ID
      conversation: newConversation._id,
      content: `<p>A role-play chat has been started between you and @${user.username}. Optionally, before you start role-playing, you can select an existing character from above or <a href = "/new-character">create a new one</a> to share with your role-play partner.</p>`,
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

  async getAllMessagesInConversation(chatID: string, user: UserPayload) {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    await conversation.populate({
      path: 'messages',
      populate: {
        path: 'sender',
        select: 'username profilePicture',
      },
    });

    // validate that the user is a participant in the chat
    if (!conversation.participants.includes(user._id)) {
      throw new Error('User is not a participant in this conversation');
    }

    return conversation.messages;
  }

  async getAllConversationsData(user: UserPayload) {
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

  async getAllUserChats(user: UserPayload) {
    const userConversations = await this.userModel
      .findById(user._id)
      .select('conversations')
      .populate({
        path: 'conversations',
        select: '-__v',
      })
      .sort({ 'conversations.createdAt': -1 })
      .lean();

    return userConversations;
  }

  async endConversation(chatID: string) {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // update the conversation's chatEnded field to true
    await this.conversationModel.findByIdAndUpdate(conversation._id, {
      chatEnded: true,
    });

    this.eventsGateway.endConversation(conversation._id);
    return { message: 'Conversation ended successfully' };
  }

  async editMessage(
    chatID: string,
    messageID: string,
    messageDto: EditMessage,
  ) {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // update the message content
    await this.messageModel.findByIdAndUpdate(messageID, {
      content: messageDto.editedMessage,
      isEdited: true,
    });

    // only update the latest message if the most recent message is being edited and not an old message
    const latestMessage: MessageDocument | null = await this.messageModel
      .findOne({ conversation: conversation._id })
      .sort({ createdAt: -1 })
      .exec();

    if (latestMessage && latestMessage._id.toString() !== messageID) {
      return { message: 'Message edited successfully' };
    }

    // update the conversation's latestMessage field
    conversation.latestMessage = messageDto.editedMessage;
    conversation.latestMessageAt = new Date();
    await conversation.save();

    return { message: 'Message edited successfully' };
  }

  async deleteMessage(chatID: string, messageID: string) {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // find the exact message and update it so it says 'This message has been deleted'. also set 'isDeleted' to true
    await this.messageModel.findByIdAndUpdate(messageID, {
      content: 'This message has been deleted.',
      isDeleted: true,
    });

    return { message: 'Message deleted successfully' };
  }

  async deleteConversationHistory(chatID: Types.ObjectId) {
    // delete all messages associated with this conversation
    await this.messageModel.deleteMany({ conversation: chatID });

    // delete the conversation itself
    await this.conversationModel.findByIdAndDelete(chatID);

    return { message: 'Conversation history deleted successfully' };
  }

  async removeChatFromList(chatID: string, user: UserPayload) {
    const conversation = await this.conversationModel.findByIdAndUpdate(
      chatID,
      { $addToSet: { hiddenFor: user._id } },
      { new: true },
    );

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // remove convo from user's list
    await this.userModel.findByIdAndUpdate(user._id, {
      $pull: { conversations: conversation._id },
    });

    if (conversation.hiddenFor.length === conversation.participants.length) {
      await this.deleteConversationHistory(conversation._id);
      return { message: 'Conversation deleted for both users' };
    }

    return { message: 'Conversation hidden for user' };
  }
}
