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
import { Inject, UseGuards } from '@nestjs/common';
import { IsChatMemberGuard } from 'src/guards/websockets/isChatMember.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/inbox/Message';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private eventsService: EventsService,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel('Conversation') private conversationModel: Model<any>,
  ) {}

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

    const userID = this.eventsService.getUserIdBySocketId(client.id);

    this.eventsService.removeUserBySocketId(client.id);

    if (userID) {
      const releasedChatIDs =
        this.eventsService.removeUserFromAllNotesEditors(userID);

      for (const chatID of releasedChatIDs) {
        this.server.to(chatID).emit('noteEditorResponse', {
          chatID,
          username: '',
        });
      }
    }
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
  async createNote(
    @MessageBody()
    payload: {
      chatID: string;
      uid: string;
      username: string;
      action: 'start' | 'stop';
    },
  ) {
    const { chatID, uid, username, action } = payload;

    if (action === 'start') {
      // first check if a uid is already inside the notesEditorMap for this chatID
      //  -> if it is, return and don't do anything
      // -> if it isn't, add the uid to the notesEditorMap for this chatID
      const existingEditor = this.eventsService.getNotesEditor(chatID);

      if (existingEditor) {
        // console.log(
        //   `User ${existingEditor.userID} is already editing a note for chat ${chatID}`,
        // );
        this.server.to(chatID).emit('noteEditorResponse', {
          chatID,
          username: existingEditor.username,
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
    } else {
      // first check if a uid is already inside the notesEditorMap for this chatID
      //  -> if it is, check if the uid matches the one in the payload
      //    -> if it does, remove the uid from the notesEditorMap for this chatID
      //    -> if it doesn't, return and don't do anything
      //  -> if it isn't, return and don't do anything
      const existingEditor = this.eventsService.getNotesEditor(chatID);

      if (existingEditor) {
        if (existingEditor.userID === uid) {
          this.eventsService.removeUserFromNotesEditorMap(chatID, uid);
          this.server.to(chatID).emit('noteEditorResponse', {
            chatID,
            username: '',
          });
        } else {
          // console.log(
          //   `User ${existingEditor.userID} is already editing a note for chat ${chatID}`,
          // );
          this.server.to(chatID).emit('noteEditorResponse', {
            chatID,
            username: existingEditor.username,
          });
        }
      } else {
        this.server.to(chatID).emit('noteEditorResponse', {
          chatID,
          username: '',
        });
      }

      // only emit if the uid that corresponds to the chatID in the notesEditorMap is the same as the uid in the payload
      if (existingEditor && existingEditor.userID === uid) {
        // const content = `@${username} has stopped editing notes for this role-play. To view changes, open the notes tab in the side panel.`;
        // const systemMessage = await this.messageModel.create({
        //   sender: '000000000000000000000001',
        //   conversation: new Types.ObjectId(chatID),
        //   content,
        // });
        // await this.conversationModel.findByIdAndUpdate(
        //   new Types.ObjectId(chatID),
        //   {
        //     $push: { messages: systemMessage._id },
        //   },
        // );
        // this.emitSystemMessage(chatID, content);
      }
    }

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
