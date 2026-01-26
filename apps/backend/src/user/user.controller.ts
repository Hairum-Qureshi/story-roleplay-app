import { Controller, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import type { Response } from 'express';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Delete('delete-account')
  @UseGuards(AuthGuard())
  async deleteAccount(
    @CurrentUser() user: UserPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.userService.deleteUserById(user._id);

    res.clearCookie('auth-session', this.authService.getAuthCookieOptions());
  }
}
