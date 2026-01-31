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

    await message.populate('sender', 'username profilePicture');

    // update the conversation's messages array with that message ID
    await this.conversationModel.findByIdAndUpdate(conversation._id, {
      $push: { messages: message._id },
    });

    const otherParticipantID: string = participants.find(
      (participantID) => participantID !== user._id,
    ) as string;

    if (
      user.conversations.some((conversation) => conversation._id.equals(chatID))
    ) {
      // re-add the conversation to the user's list of conversations if it doesn't exist
      await this.reAddConversationToUserList(conversation._id, user._id);
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
        populate: {
          path: 'messages',
          select: '-__v',
          populate: {
            path: 'sender',
            select: 'username profilePicture',
          },
        },
      })
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

  async deleteConversationHistory(chatID: string) {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // delete all messages associated with this conversation
    await this.messageModel.deleteMany({ conversation: conversation._id });

    // delete the conversation itself
    await this.conversationModel.findByIdAndDelete(conversation._id);

    return { message: 'Conversation history deleted successfully' };
  }

  async removeChatFromList(chatID: string, user: UserPayload) {
    // the idea is, if the user deletes the chat (but the chat hasn't ended), the chat ID will be removed from their array of conversations. When their partner sends them a message, the conversation will be re-added to their array of conversations and hence it'll appear in their list of conversations again.
    const conversationDoc = await this.conversationModel
      .findById(chatID)
      .populate({
        path: 'participants',
        select: 'username profilePicture',
      });

    if (!conversationDoc) {
      throw new Error('Conversation not found');
    }

    const participants: {
      _id: string;
      username: string;
      profilePicture: string;
    }[] = conversationDoc.participants as unknown as {
      _id: string;
      username: string;
      profilePicture: string;
    }[];

    // first, we need to check if both users no longer have this conversation ID in their list of conversations AND that the conversation object's participants array includes both users' UIDs. If so, we delete the conversation entirely (including its messages). If not, we just remove the chat ID from the user's list of conversations.
    const user1 = await this.userModel.findById(participants[0]._id);
    const user2 = await this.userModel.findById(participants[1]._id);

    const user1HasChat = user1?.conversations.some((convID) =>
      convID.equals(conversationDoc._id),
    );
    const user2HasChat = user2?.conversations.some((convID) =>
      convID.equals(conversationDoc._id),
    );

    if (!user1HasChat && !user2HasChat) {
      // both users have removed the conversation from their list, so delete the conversation entirely
      await this.deleteConversationHistory(conversationDoc._id.toString());
      return {
        message:
          'Conversation removed from list and deleted successfully as both users had removed it.',
      };
    } else {
      // just remove the chat ID from the user's list of conversations
      await this.userModel.findByIdAndUpdate(user._id, {
        $pull: { conversations: conversationDoc._id },
      });
      return { message: 'Conversation removed from list successfully' };
    }
  }
}
