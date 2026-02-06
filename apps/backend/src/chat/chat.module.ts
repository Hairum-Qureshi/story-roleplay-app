import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationSchema,
} from '../schemas/inbox/Conversation';
import { RolePlayAd, RolePlayAdSchema } from '../schemas/RolePlayAd';
import { User, UserSchema } from '../schemas/User';
import { AuthModule } from '../auth/auth.module';
import { Message, MessageSchema } from '../schemas/inbox/Message';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: RolePlayAd.name, schema: RolePlayAdSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    EventsModule,
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
