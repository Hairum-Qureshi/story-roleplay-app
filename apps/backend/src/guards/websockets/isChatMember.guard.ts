// create a websocket guard that checks if the user is a member of the chat before allowing them to connect to the socket
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { EventsService } from 'src/events/events.service';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class IsChatMemberGuard implements CanActivate {
  constructor(
    private readonly eventsService: EventsService,
    private readonly chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    const userID = client.handshake.auth.userId;
    const chatID = data.chatID;

    if (!userID || !chatID) {
      throw new WsException('Missing user ID or chat ID');
    }

    const isMember = await this.chatService.isUserMemberOfChat(userID, chatID);

    if (!isMember) {
      throw new WsException('User is not a member of this chat');
    }

    return true;
  }
}
