import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from '../schemas/inbox/Conversation';
import { RolePlayAd } from '../schemas/RolePlayAd';
import type {
  UserPayload,
  ConversationDocument,
  RolePlayAd as RolePlayAdInterface,
  Notif,
} from '../types';
import { User, UserDocument } from '../schemas/User';
import { Message } from '../schemas/inbox/Message';
import type { Message as MessageInterface } from '../types';
import { CreateMessage } from '../DTOs/CreateMessage.dto';
import type { MessageDocument } from '../types';
import { EventsGateway } from '../events/events.gateway';
import { EditMessage } from '../DTOs/EditMessage.dto';
import { Notification } from '../schemas/Notification';

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
    @InjectModel(Notification.name)
    private notificationModel: Model<Notif>,
  ) {}

  async isUserMemberOfChat(userID: string, chatID: string): Promise<boolean> {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(chatID);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation.participants.includes(userID);
  }

  private async checkIfConversationExists(
    convoID: string,
  ): Promise<ConversationDocument> {
    const conversation: ConversationDocument | null =
      await this.conversationModel.findById(convoID);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

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
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

    if (!messageDto.message || !messageDto.message.trim()) {
      throw new HttpException(
        'Message cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (messageDto.message.length > 2000) {
      throw new HttpException(
        'Message cannot exceed 2000 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const participants: string[] = conversation.participants;

    // validate that the user is a participant in the chat
    if (!participants.includes(user._id)) {
      throw new Error('User is not a participant in this conversation');
    }

    const senderUIDFromClient =
      typeof messageDto.senderUID === 'string' ? messageDto.senderUID : null;

    if (senderUIDFromClient && senderUIDFromClient !== user._id) {
      throw new HttpException(
        'Invalid sender UID for authenticated user',
        HttpStatus.BAD_REQUEST,
      );
    }

    const senderUIDForEmit = senderUIDFromClient || user._id;

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

    // re-add the conversation to the other participant's list of conversations if it doesn't exist but need to first check if they have it

    if (conversation.hiddenFor.length > 0) {
      // if the conversation is hidden for any users, we need to re-add it to their list
      for (const hiddenUserID of conversation.hiddenFor) {
        await this.reAddConversationToUserList(conversation._id, hiddenUserID);
      }
    }

    void this.eventsGateway.sendMessageToUser(
      conversation._id.toString(),
      message,
      participants.filter(
        (participantID) => participantID !== '000000000000000000000001',
      ), // send to all participants except the SYSTEM user
      senderUIDForEmit,
    );

    return {
      message,
      chatID: conversation._id,
    };
  }

  async createSystemMessage(
    conversationID: Types.ObjectId,
    content: string,
  ): Promise<MessageInterface> {
    const message = await this.messageModel.create({
      sender: '000000000000000000000001', // SYSTEM user ID
      conversation: conversationID,
      content,
    });

    return message;
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
          $all: [user._id, ad.author, '000000000000000000000001'],
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
        participants: [user._id, ad.author, '000000000000000000000001'], // include SYSTEM user as a participant
        messages: [],
      });

    // get the partner's username
    const partner = await this.userModel
      .findById(ad.author)
      .select('username')
      .lean();

    if (!partner) {
      throw new Error('Ad author not found');
    }

    // create a welcome message from SYSTEM to both users
    const message: MessageInterface = await this.createSystemMessage(
      newConversation._id,
      `A role-play chat has been started between you and @${partner.username}. Optionally, before you begin role-playing, you can organize your thoughts by creating notes that can be viewable between you and your partner. Please do not include personal informational in these notes. To create a note, open the side panel and click the 'Create Note' button.`,
    );

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
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

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
    const allNotifications = await this.notificationModel
      .find({ userID: user._id })
      .lean()
      .select('convoID unreadCount -_id');

    const userConversations = await this.userModel
      .findById(user._id)
      .select('conversations')
      .populate({
        path: 'conversations',
        select: '-__v',
        options: {
          sort: { createdAt: -1 },
        },
      })
      .lean();

    const updatedUserConversationsObject = userConversations?.conversations.map(
      (conversation) => {
        return {
          ...conversation,
          unreadCount:
            allNotifications.find(
              (notification) =>
                notification.convoID.toString() === conversation._id.toString(),
            )?.unreadCount || 0,
        };
      },
    );

    return {
      _id: userConversations?._id,
      conversations: updatedUserConversationsObject,
    };
  }

  async endConversation(chatID: string) {
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

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
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

    if (!messageDto.editedMessage || !messageDto.editedMessage.trim()) {
      throw new HttpException(
        'Message cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (messageDto.editedMessage.length > 2000) {
      throw new HttpException(
        'Message cannot exceed 2000 characters',
        HttpStatus.BAD_REQUEST,
      );
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
    await this.checkIfConversationExists(chatID);

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

    if (
      conversation.hiddenFor.length + 1 ===
      conversation.participants.length
    ) {
      // It needs to be +1 because the SYSTEM_USER is also a participant
      await this.deleteConversationHistory(conversation._id);
      this.eventsGateway.endConversation(''); // resets the deletedConversationID in the frontend so that if the user goes back to the same chat, it won't consider this brand new conversation as an ended conversation like before

      return { message: 'Conversation deleted for both users' };
    }

    return { message: 'Conversation hidden for user' };
  }

  async pinMessage(messageID: string, username: string) {
    const message: MessageDocument | null =
      await this.messageModel.findById(messageID);

    if (!message)
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    if (message.isDeleted) {
      throw new HttpException(
        'Cannot pin a deleted message',
        HttpStatus.BAD_REQUEST,
      );
    }

    message.isPinned = !message.isPinned;
    await message.save();

    const systemMessage = await this.createSystemMessage(
      new Types.ObjectId(message.conversation.toString()),
      `@${username} has ${message.isPinned ? 'pinned' : 'unpinned'} a message. Check out all the pinned messages in the side panel.`,
    );

    await this.conversationModel.findByIdAndUpdate(message.conversation, {
      $push: { messages: systemMessage._id },
    });

    this.eventsGateway.emitSystemMessage(
      message.conversation.toString(),
      systemMessage,
    );
  }

  async getPinnedMessages(chatID: string) {
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

    const pinnedMessages: MessageDocument[] = await this.messageModel
      .find({
        conversation: conversation._id,
        isPinned: true,
        isDeleted: false,
      })
      .populate('sender', 'username profilePicture')
      .select('content sender createdAt');

    return pinnedMessages;
  }

  async getRolePlayNotes(chatID: string) {
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

    return {
      notes: conversation.notes || '',
    };
  }

  async createRolePlayNotes(chatID: string, content: string, userID: string) {
    // first check if a conversation exists by ID by invoking the checkIfConversationExists method
    const conversation: ConversationDocument =
      await this.checkIfConversationExists(chatID);

    if (conversation.chatEnded) {
      throw new HttpException(
        'Cannot create notes for a conversation that has ended',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!content || !content.trim())
      throw new HttpException(
        'Note content cannot be empty',
        HttpStatus.BAD_REQUEST,
      );

    // then check if a note exists for the conversation
    const existingNote: ConversationDocument | null =
      await this.conversationModel.findById(chatID).select('notes');
    if (existingNote && existingNote.notes) {
      // if a note exists, update it
      existingNote.notes = content;
      await existingNote.save();
    } else {
      // if a note doesn't exist, create it
      await this.conversationModel.findByIdAndUpdate(chatID, {
        notes: content,
      });

      // emit a system message letting the users know notes for this role-play have been created
      const systemMessage = await this.createSystemMessage(
        new Types.ObjectId(chatID),
        `Role-play notes have been created for this conversation. Check out the side panel to view them.`,
      );

      await this.conversationModel.findByIdAndUpdate(chatID, {
        $push: { messages: systemMessage._id },
      });

      const participants: string[] = conversation.participants;

      void this.eventsGateway.sendMessageToUser(
        conversation._id.toString(),
        systemMessage,
        participants.filter(
          (participantID) => participantID !== '000000000000000000000001',
        ),
        userID,
      );
    }

    // first check if a note exists for the conversation
  }
}
