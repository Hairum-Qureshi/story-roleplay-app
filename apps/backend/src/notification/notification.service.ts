import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from 'src/schemas/Notification';
import { Conversation } from 'src/types';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel('Conversation')
    private conversationModel: Model<Conversation>,
  ) {}

  private async checkIfConversationExists(
    chatID: string,
  ): Promise<Conversation> {
    const conversation = await this.conversationModel.findById(chatID).exec();
    if (!conversation) throw new NotFoundException('Conversation not found');
    return conversation;
  }

  async createNotification(chatID: string, userID: string) {
    await this.checkIfConversationExists(chatID);

    // first check if a notification already exists for this user and chat
    const exisitingNotifRecord = await this.notificationModel.findOne({
      userID,
      convoID: chatID,
    });

    if (exisitingNotifRecord) {
      // if it exists, increment the unreadCount by 1
      return this.notificationModel.findOneAndUpdate(
        { userID, convoID: chatID },
        { $inc: { unreadCount: 1 } },
        { new: true },
      );
    } else {
      // if it doesn't exist, create a new notification record with unreadCount = 1
      const newNotification = new this.notificationModel({
        userID,
        convoID: chatID,
        unreadCount: 1,
      });
      return newNotification.save();
    }
  }

  async resetUnreadCount(chatID: string, userID: string): Promise<void> {
    await this.notificationModel.findOneAndUpdate(
      { userID, convoID: chatID },
      { $set: { unreadCount: 0 } },
    );
  }
}
