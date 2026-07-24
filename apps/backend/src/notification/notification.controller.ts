import { Controller, Post, UseGuards, Param, Patch, Get } from '@nestjs/common';
import type { UserPayload } from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from './notification.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post(':chatID/new')
  @UseGuards(AuthGuard())
  createNotification(
    @Param('chatID') chatID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.notificationService.createNotification(chatID, user._id);
  }

  @Patch(':chatID/reset/unread-count')
  @UseGuards(AuthGuard())
  resetUnreadCount(
    @Param('chatID') chatID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.notificationService.resetUnreadCount(chatID, user._id);
  }

  @Get('/all/total')
  @UseGuards(AuthGuard())
  getAllNotifications(@CurrentUser() user: UserPayload) {
    return this.notificationService.getTotalNotifications(user._id);
  }
}
