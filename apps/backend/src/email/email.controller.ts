import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '@nestjs/passport';
import type { UserPayload } from '../types';
import { SendEmail } from '../DTOs/SendEmail.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { ModerationGuard } from 'src/guards/moderation.guard';
import { Roles } from 'src/decorators/roles.decorator';
import Role from 'src/enums/roles.enum';
import { ReportedUserEmailPayload } from 'src/DTOs/ReportedUserEmail.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  @UseGuards(AuthGuard(), ModerationGuard)
  async sendEmail(
    @CurrentUser() currUser: UserPayload,
    @Body() sendEmailDto: SendEmail,
  ) {
    await this.emailService.sendEmail(sendEmailDto, currUser);
    return { message: 'Email sent successfully' };
  }

  @Post('/moderator-apology/send')
  @UseGuards(AuthGuard(), ModerationGuard)
  @Roles([Role.ADMIN, Role.MODERATOR])
  async sendApologyModeratorEmail(
    @CurrentUser() currUser: UserPayload,
    @Body() reportedUserDataDto: ReportedUserEmailPayload,
  ) {
    await this.emailService.sendApologyModeratorEmail(
      currUser,
      reportedUserDataDto,
    );
  }

  @Post('/moderator-notice/send')
  @UseGuards(AuthGuard(), ModerationGuard)
  @Roles([Role.ADMIN, Role.MODERATOR])
  async sendNoticeModeratorEmail(
    @Body() reportedUserDataDto: ReportedUserEmailPayload,
  ) {
    await this.emailService.sendModeratorNoticeEmail(reportedUserDataDto);
  }
}
