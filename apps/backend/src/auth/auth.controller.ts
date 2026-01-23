import {
  Body,
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

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('google-sign-up')
  @UsePipes(new ValidationPipe())
  googleAuth(@BearerToken() token: string): Promise<{ jwtToken: string }> {
    return this.userService.googleAuth(token);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: express.Response): {
    message: string;
  } {
    return this.userService.signOut(res);
  }

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.userService.getCurrentUser(user);
  }
}
