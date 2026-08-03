import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { IsChatMemberGuard } from '../guards/websockets/isChatMember.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from '../notification/notification.module';
import {
  Conversation,
  ConversationSchema,
} from '../schemas/inbox/Conversation';
// import { Message, MessageSchema } from 'src/schemas/inbox/Message';

@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    // MongooseModule.forFeature([
    //   {
    //     name: Message.name,
    //     schema: MessageSchema,
    //   },
    // ]),
  ],
  providers: [EventsGateway, EventsService, IsChatMemberGuard],
  exports: [EventsGateway],
})
export class EventsModule {}
