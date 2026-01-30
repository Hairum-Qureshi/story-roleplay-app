import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation } from 'src/schemas/inbox/Conversation';
import { ConversationSchema } from 'src/schemas/inbox/Conversation';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
