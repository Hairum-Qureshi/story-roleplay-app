import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import * as types from '../types';
import express from 'express';
import { BearerToken } from '../decorators/bearerToken.decorator';
import type { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('google/sign-in')
  @UsePipes(new ValidationPipe())
  async googleAuth(
    @BearerToken() token: string,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string }> {
    const { jwtToken } = await this.authService.googleAuth(token);

    res.cookie('auth-session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { jwtToken };
  }

  @Redirect()
  @Get('discord/redirect')
  async discordAuth(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string } | { url: string; statusCode: number }> {
    if (!code)
      return {
        url: this.configService.get<string>('FRONTEND_URL') as string,
        statusCode: 302,
      };

    const { jwtToken } = await this.authService.discordAuth(code);

    res.cookie('auth-session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      jwtToken,
      url: this.configService.get<string>('FRONTEND_URL') as string,
      statusCode: 302,
    };
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response): {
    message: string;
  } {
    res.clearCookie('auth-session', this.authService.getAuthCookieOptions());
    return { message: 'success' };
  }

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.authService.getCurrentUser(user);
  }
}
