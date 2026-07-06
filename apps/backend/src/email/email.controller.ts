import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '@nestjs/passport';
import type { UserPayload } from '../types';
import { SendEmail } from '../DTOs/SendEmail.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  @UseGuards(AuthGuard())
  async sendEmail(
    @CurrentUser() currUser: UserPayload,
    @Body() sendEmailDto: SendEmail,
  ) {
    await this.emailService.sendEmail(sendEmailDto, currUser);
    return { message: 'Email sent successfully' };
  }
}
