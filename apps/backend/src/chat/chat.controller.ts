import {
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { ChatService } from './chat.service';
import { CreateMessage } from 'src/DTOs/CreateMessage.dto';
import { IsChatMember } from 'src/guards/IsChatMember.guard';
import { EditMessage } from 'src/DTOs/EditMessage.dto';

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

  @Get(':chatID/all-messages')
  @UseGuards(AuthGuard())
  getAllMessagesInConversation(
    @Param('chatID') chatID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.getAllMessagesInConversation(chatID, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  getAllConversations(@CurrentUser() user: UserPayload) {
    return this.chatService.getAllConversations(user);
  }

  @Patch(':chatID/end-conversation')
  @UseGuards(AuthGuard(), IsChatMember)
  endConversation(@Param('chatID') chatID: string) {
    return this.chatService.endConversation(chatID);
  }

  @Patch(':chatID/:messageID/edit-message')
  @UseGuards(AuthGuard(), IsChatMember)
  editMessage(
    @Param('chatID') chatID: string,
    @Param('messageID') messageID: string,
    @Body() messageDto: EditMessage,
  ) {
    return this.chatService.editMessage(chatID, messageID, messageDto);
  }

  @Patch(':chatID/:messageID/delete-message')
  @UseGuards(AuthGuard(), IsChatMember)
  deleteMessage(
    @Param('chatID') chatID: string,
    @Param('messageID') messageID: string,
  ) {
    return this.chatService.deleteMessage(chatID, messageID);
  }
}
