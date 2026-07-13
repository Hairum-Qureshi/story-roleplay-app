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
import { IsChatMemberGuard } from '../guards/websockets/isChatMember.guard';
import { NotificationService } from 'src/notification/notification.service';
// import { Model } from 'mongoose';
// import { Message } from 'src/schemas/inbox/Message';
// import { Conversation } from 'src/schemas/inbox/Conversation';

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
    private notificationService: NotificationService,
    // @InjectModel(Message.name)
    // private messageModel: Model<Message>,
    // @InjectModel('Conversation') private conversationModel: Model<Conversation>,
  ) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.auth?.userId as string | undefined;

    // console.log(`Client connected: ${client.id} with uid: ${userId}`);

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
  sendMessageToUser(chatID: string, message: string, participants?: string[]) {
    this.server.to(chatID).emit('newMessage', message);

    // check if the user has the chat open; if not, emit a notification to the user and also create a notification in the database for the user

    // first check if the user is in the room for the chatID from the roomToUsersMap in the eventsService
    const usersInRoom = this.eventsService.viewRoomToUsersMap().get(chatID);

    if (!usersInRoom)
      // console.log(`No users in room for chatID: ${chatID}`);
      return;

    usersInRoom.forEach((userID) => {
      if (!participants?.length) return;

      const [partnerUID] = participants.filter(
        (participantID) => participantID !== userID,
      );

      this.emitMessageNotification(chatID, partnerUID);
    });
  }

  @UseGuards(IsChatMemberGuard)
  emitSystemMessage(chatID: string, message: string) {
    this.server.to(chatID).emit('newMessage', message);
  }

  @UseGuards(IsChatMemberGuard)
  async emitMessageNotification(chatID: string, participantUID: string) {
    const userSocketID = this.eventsService.getUserSocketId(participantUID);

    if (!userSocketID) return;

    this.server.to(userSocketID).emit('newMessageNotification', '+1');
    await this.notificationService.createNotification(chatID, participantUID);
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
      this.eventsService.addUserToRoom(
        chatID,
        client.handshake.auth?.userId as string,
      );
      // console.log(`Client ${client.id} joined chat room: ${chatID}`);
    }

    // [debug] show all the users that are in chatID
    // const clientsInRoom = await this.server.in(chatID).fetchSockets();
    // const clientIdsInRoom = clientsInRoom.map((socket) => socket.id);
    // console.log(
    //   `Clients in chat room ${chatID}: ${clientIdsInRoom.join(', ')}`,
    // );
    // console.log('[debug]', this.eventsService.viewRoomToUsersMap());
  }

  @SubscribeMessage('noteEditorUpdate')
  createNote(
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
      // if (existingEditor && existingEditor.userID === uid) {
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
      // }
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
      // TODO - change the room to be the chatID instead of the socketID
      this.server.to(socketID).emit('typingIndicator', {
        typing,
        partnerUsername,
        currentTypingChatID,
      });
    }
  }
}
