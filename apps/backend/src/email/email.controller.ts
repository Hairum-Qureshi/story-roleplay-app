import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { SendEmail } from 'src/DTOs/SendEmail.dto';

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
