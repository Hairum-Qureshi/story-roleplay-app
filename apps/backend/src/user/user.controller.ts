import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ModerationGuard } from 'src/guards/moderation.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/currentUser.decorator';
import type { UserPayload } from '../types';
import type { Response } from 'express';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post(':userID/block')
  @UseGuards(AuthGuard(), ModerationGuard)
  async blockUser(
    @CurrentUser() user: UserPayload,
    @Param('userID') userID: string,
  ) {
    await this.userService.blockUser(user._id, userID);
  }

  @Post(':userID/unblock')
  @UseGuards(AuthGuard(), ModerationGuard)
  async unblockUser(
    @CurrentUser() user: UserPayload,
    @Param('userID') userID: string,
  ) {
    await this.userService.unblockUser(user._id, userID);
  }

  @Get('all/blocked')
  @UseGuards(AuthGuard(), ModerationGuard)
  async getBlockedUsers(@CurrentUser() user: UserPayload) {
    return this.userService.getBlockedUsers(user._id);
  }

  @Delete('delete-account')
  @UseGuards(AuthGuard(), ModerationGuard)
  async deleteAccount(
    @CurrentUser() user: UserPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.userService.deleteUserById(user._id, user.role);

    res.clearCookie('auth-session', this.authService.getAuthCookieOptions());
  }
}
