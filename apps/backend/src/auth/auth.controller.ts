import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import express from 'express';
import { BearerToken } from 'src/decorators/bearerToken.decorator';
import type { Response, CookieOptions } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/sign-in')
  @UsePipes(new ValidationPipe())
  googleAuth(
    @BearerToken() token: string,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string }> {
    return this.authService.googleAuth(token, res);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response): {
    message: string;
  } {
    res.clearCookie(
      'auth-session',
      this.authService.getAuthCookieOptions() as CookieOptions,
    );
    return { message: 'success' };
  }

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.authService.getCurrentUser(user);
  }
}
