import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationSchema,
} from 'src/schemas/inbox/Conversation';
import { RolePlayAd, RolePlayAdSchema } from 'src/schemas/RolePlayAd';
import { User, UserSchema } from 'src/schemas/User';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: RolePlayAd.name, schema: RolePlayAdSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
