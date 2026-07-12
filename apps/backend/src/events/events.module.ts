import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { IsChatMemberGuard } from 'src/guards/websockets/isChatMember.guard';
// import { MongooseModule } from '@nestjs/mongoose';
// import {
//   Conversation,
//   ConversationSchema,
// } from 'src/schemas/inbox/Conversation';
// import { Message, MessageSchema } from 'src/schemas/inbox/Message';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: Conversation.name, schema: ConversationSchema },
    // ]),
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
