import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation } from 'src/schemas/inbox/Conversation';
import { ConversationSchema } from 'src/schemas/inbox/Conversation';
import { User } from 'src/schemas/User';
import { UserSchema } from 'src/schemas/User';
import { Message } from 'src/schemas/inbox/Message';
import { MessageSchema } from 'src/schemas/inbox/Message';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
