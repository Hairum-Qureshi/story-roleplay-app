import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'src/schemas/inbox/Conversation';

@Injectable()
export class IsChatMember implements CanActivate {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const chatID = request.params.chatID;

    const conversation = await this.conversationModel.findById(chatID).exec();

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const isMember = conversation.participants.some(
      (participantId) => participantId.toString() === user._id,
    );

    if (!isMember) {
      throw new ForbiddenException('You are not a member of this chat');
    }

    return true;
  }
}
