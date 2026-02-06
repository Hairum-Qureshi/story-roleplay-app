import { Module } from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { RolePlayAdController } from './role-play-ad.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User';
import { RolePlayAd, RolePlayAdSchema } from 'src/schemas/RolePlayAd';
import { EventsModule } from 'src/events/events.module';
import {
  Conversation,
  ConversationSchema,
} from 'src/schemas/inbox/Conversation';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RolePlayAd.name, schema: RolePlayAdSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    EventsModule,
    ChatModule,
  ],
  providers: [RolePlayAdService],
  controllers: [RolePlayAdController],
})
export class RolePlayAdModule {}
