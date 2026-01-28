import { Controller, Param, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { ChatService } from './chat.service';
import { CreateMessage } from 'src/DTOs/CreateMessage.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/:chatID/send-message')
  @UseGuards(AuthGuard())
  createConversationMessage(
    @Param('chatID') chatID: string,
    @Body() messageDto: CreateMessage,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.createConversationMessage(chatID, messageDto, user);
  }

  @Post('create/:adID')
  @UseGuards(AuthGuard())
  createConversation(
    @Param('adID') adID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.createConversation(adID, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  getAllConversations(@CurrentUser() user: UserPayload) {
    return this.chatService.getAllConversations(user);
  }
}
