import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message, RolePlayAd } from 'src/types';
import { EventsService } from './events.service';
import { Types } from 'mongoose';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private eventsService: EventsService) {}

  handleConnection(client: Socket) {
    const { userId } = client.handshake.auth;

    console.log(`Client connected: ${client.id} with uid: ${userId}`);

    client.emit('connected', {
      message: 'Successfully connected to WebSocket gateway',
      socketId: client.id,
    });

    this.eventsService.identifyUser(client.id, userId);
    console.log(this.eventsService.viewMap());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.eventsService.removeUserBySocketId(client.id);
    console.log(this.eventsService.viewMap());
  }

  emitNewAd(ad: RolePlayAd) {
    this.server.emit('newRolePlayAd', ad);
  }

  sendMessageToUser(userID: string, message: Message) {
    const socketID: string | undefined =
      this.eventsService.getUserSocketId(userID);

    if (socketID) {
      this.server.to(socketID).emit('newMessage', message);
    }
  }

  emitSystemMessage(userIDs: string[], message: Message) {
    userIDs.forEach((userID) => {
      const socketID: string | undefined =
        this.eventsService.getUserSocketId(userID);

      if (socketID) {
        this.server.to(socketID).emit('newMessage', message);
      }
    });
  }

  endConversation(chatID: Types.ObjectId) {
    this.server.emit('conversationEnded', { chatID });
  }

  @SubscribeMessage('typingIndicator')
  typingIndicator(
    @MessageBody()
    payload: {
      typing: boolean;
      partnerID: string;
      partnerUsername: string;
      currentTypingChatID: string;
    },
  ) {
    const { typing, partnerID, partnerUsername, currentTypingChatID } = payload;

    const socketID: string | undefined =
      this.eventsService.getUserSocketId(partnerID);

    if (socketID) {
      this.server.to(socketID).emit('typingIndicator', {
        typing,
        partnerUsername,
        currentTypingChatID,
      });
    }
  }
}
