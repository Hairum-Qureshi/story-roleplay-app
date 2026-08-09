import {
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  Body,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModerationGuard } from '../guards/moderation.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import type { UserPayload } from '../types';
import { ChatService } from './chat.service';
import { CreateMessage } from '../DTOs/CreateMessage.dto';
import { IsChatMember } from '../guards/IsChatMember.guard';
import { EditMessage } from '../DTOs/EditMessage.dto';
import { IsMessageOwner } from '../guards/IsMessageOwner.guard';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/:chatID/send-message')
  @UseGuards(AuthGuard(), ModerationGuard)
  createConversationMessage(
    @Param('chatID') chatID: string,
    @Body() messageDto: CreateMessage,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.createConversationMessage(chatID, messageDto, user);
  }

  @Post('create/:adID')
  @UseGuards(AuthGuard(), ModerationGuard)
  createConversation(
    @Param('adID') adID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.createConversation(adID, user);
  }

  @Get(':chatID/all-messages')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  getAllMessagesInConversation(
    @Param('chatID') chatID: string,
    @Query('page') page: string,
  ) {
    return this.chatService.getAllMessagesInConversation(chatID, page);
  }

  @Get('all-data')
  @UseGuards(AuthGuard(), ModerationGuard)
  getAllConversationsData(@CurrentUser() user: UserPayload) {
    return this.chatService.getAllConversationsData(user);
  }

  @Get('all/user-chats')
  @UseGuards(AuthGuard(), ModerationGuard)
  getAllUserChats(@CurrentUser() user: UserPayload) {
    return this.chatService.getAllUserChats(user);
  }

  @Patch(':chatID/end-conversation')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  endConversation(@Param('chatID') chatID: string) {
    return this.chatService.endConversation(chatID);
  }

  @Patch(':chatID/:messageID/edit-message')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember, IsMessageOwner)
  editMessage(
    @Param('chatID') chatID: string,
    @Param('messageID') messageID: string,
    @Body() messageDto: EditMessage,
  ) {
    return this.chatService.editMessage(chatID, messageID, messageDto);
  }

  @Patch(':chatID/:messageID/delete-message')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember, IsMessageOwner)
  deleteMessage(
    @Param('chatID') chatID: string,
    @Param('messageID') messageID: string,
  ) {
    return this.chatService.deleteMessage(chatID, messageID);
  }

  @Patch(':chatID/remove-from-list')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  removeChatFromList(
    @Param('chatID') chatID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.removeChatFromList(chatID, user);
  }

  @Patch(':chatID/:messageID/pin')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  pinMessage(
    @Param('messageID') messageID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.pinMessage(messageID, user.username as string);
  }

  @Get(':chatID/pins')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  getPinnedMessages(@Param('chatID') chatID: string) {
    return this.chatService.getPinnedMessages(chatID);
  }

  @Get(':chatID/notes')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  getRolePlayNotes(@Param('chatID') chatID: string) {
    return this.chatService.getRolePlayNotes(chatID);
  }

  @Patch(':chatID/notes')
  @UseGuards(AuthGuard(), ModerationGuard, IsChatMember)
  createRolePlayNotes(
    @Param('chatID') chatID: string,
    @Body() content: { content: string },
    @CurrentUser() user: UserPayload,
  ) {
    return this.chatService.createRolePlayNotes(
      chatID,
      content.content,
      user._id,
    );
  }
}
