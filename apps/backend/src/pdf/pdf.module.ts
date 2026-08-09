import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation } from '../schemas/inbox/Conversation';
import { ConversationSchema } from '../schemas/inbox/Conversation';
import { User, UserSchema } from '../schemas/User';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
