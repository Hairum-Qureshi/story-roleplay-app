import { Module } from '@nestjs/common';
import { Notification, NotificationSchema } from '../schemas/Notification';
import {
  Conversation,
  ConversationSchema,
} from '../schemas/inbox/Conversation';
import { User, UserSchema } from '../schemas/User';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
