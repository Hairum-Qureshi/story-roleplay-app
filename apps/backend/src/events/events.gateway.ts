import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RolePlayAd } from '../types';
import { EventsService } from './events.service';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { IsChatMemberGuard } from 'src/guards/websockets/isChatMember.guard';

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
    const userId = client.handshake.auth?.userId as string | undefined;

    console.log(`Client connected: ${client.id} with uid: ${userId}`);

    client.emit('connected', {
      message: 'Successfully connected to WebSocket gateway',
      socketId: client.id,
    });

    if (userId) {
      this.eventsService.identifyUser(client.id, userId);
      console.log(this.eventsService.viewSocketToUserMap());
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.eventsService.removeUserBySocketId(client.id);
    console.log(this.eventsService.viewSocketToUserMap());
  }

  emitNewAd(ad: RolePlayAd) {
    this.server.emit('newRolePlayAd', ad);
  }

  @SubscribeMessage('sendMessageToUser')
  @UseGuards(IsChatMemberGuard)
  sendMessageToUser(chatID: string, message: string) {
    this.server.to(chatID).emit('newMessage', message);
  }

  @UseGuards(IsChatMemberGuard)
  emitSystemMessage(chatID: string, message: string) {
    this.server.to(chatID).emit('newMessage', message);
  }

  endConversation(chatID: Types.ObjectId | string) {
    this.server.emit('conversationEnded', { chatID });
  }

  @SubscribeMessage('currentChatID')
  async currentChatID(
    @MessageBody()
    payload: {
      chatID: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { chatID } = payload;

    if (chatID && client) {
      await client.join(chatID);
      console.log(`Client ${client.id} joined chat room: ${chatID}`);
    }
  }

  @SubscribeMessage('noteEditorUpdate')
  createNote(
    @MessageBody()
    payload: {
      chatID: string;
      uid: string;
      username: string;
    },
  ) {
    const { chatID, uid, username } = payload;

    if (this.eventsService.viewNotesEditorMap().has(chatID)) {
      const existingEditor = this.eventsService.getNotesEditor(chatID);

      console.log(
        `Chat ${chatID} already has a user editing the note. Cannot add user ${uid}`,
      );

      this.server.to(chatID).emit('noteEditorResponse', {
        chatID,
        username: existingEditor?.username ?? username,
      });

      console.log({
        chatID,
        username: existingEditor?.username ?? username,
      });

      return;
    }
    const editor = this.eventsService.addUserToNotesEditorMap(
      uid,
      chatID,
      username,
    );

    this.server.to(chatID).emit('noteEditorResponse', {
      chatID,
      username: editor.username,
    });

    console.log('Notes editor Map:', this.eventsService.viewNotesEditorMap());
    return;
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
