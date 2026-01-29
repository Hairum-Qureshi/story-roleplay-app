import { Injectable } from '@nestjs/common';
import type { UserPayload } from 'src/types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'src/schemas/inbox/Conversation';
import { User, UserDocument } from 'src/schemas/User';
import { Message } from 'src/schemas/inbox/Message';

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  generatePdf(chatID: string, user: UserPayload) {}
}
