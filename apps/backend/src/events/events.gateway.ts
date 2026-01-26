import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { CreateMessageDto } from 'src/DTOs/create-message.dto';
// import { UpdateMessageDto } from 'src/DTOs/update-message.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('createMessage')
  // create(@MessageBody() createMessageDto: CreateMessageDto) {
  //   return this.eventsService.create(createMessageDto);
  // }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    client.emit('connected', {
      message: 'Successfully connected to WebSocket gateway',
      socketId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Method to emit a new ad to all connected clients
  emitNewAd(ad: any) {
    this.server.emit('newRolePlayAd', ad);
  }

  // @SubscribeMessage('findAllPosts')
  // async findAllPosts() {
  //   return await this.eventsService.findAll();
  // }

  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.eventsService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.eventsService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.eventsService.remove(id);
  // }

  // @SubscribeMessage('join')
  // joinRoom() {
  //   // Logic for joining a room can be implemented here
  // }

  // @SubscribeMessage('typing')
  // typing() {
  //   // Logic for handling typing events can be implemented here
  // }
}
