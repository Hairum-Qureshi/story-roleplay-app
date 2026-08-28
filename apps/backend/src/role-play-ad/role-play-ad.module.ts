import { Module } from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { RolePlayAdController } from './role-play-ad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User';
import { RolePlayAd, RolePlayAdSchema } from '../schemas/RolePlayAd';
import { EventsModule } from '../events/events.module';
import {
  Conversation,
  ConversationSchema,
} from '../schemas/inbox/Conversation';
import { ChatModule } from '../chat/chat.module';
import { Like, LikeSchema } from '../schemas/Like';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RolePlayAd.name, schema: RolePlayAdSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    EventsModule,
    ChatModule,
    EmailModule,
  ],
  providers: [RolePlayAdService],
  controllers: [RolePlayAdController],
})
export class RolePlayAdModule {}
