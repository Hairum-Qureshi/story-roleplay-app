import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from 'src/schemas/inbox/Conversation';
import { ConversationDocument } from 'src/types';

@Injectable()
export class IsChatMemberGuard implements CanActivate {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    const userID = client.handshake?.auth?.userId;
    const chatID = data?.chatID;

    if (
      typeof userID !== 'string' ||
      !userID.trim() ||
      typeof chatID !== 'string' ||
      !chatID.trim()
    ) {
      throw new WsException('Missing user ID or chat ID');
    }

    const conversation = await this.conversationModel
      .findById(chatID)
      .select('participants')
      .lean();

    const isMember = !!conversation?.participants.includes(userID);

    if (!isMember) {
      throw new WsException('User is not a member of this chat');
    }

    return true;
  }
}
