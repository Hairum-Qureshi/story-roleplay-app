import { HttpException, Injectable } from '@nestjs/common';
import { UserPayload } from '../types';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmail } from '../DTOs/SendEmail.dto';
import { ReportedUserEmailPayload } from 'src/DTOs/ReportedUserEmail.dto';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendEmail(sendEmailDto: SendEmail, currUser: UserPayload) {
    const { from, subject, message } = sendEmailDto;

    if (!from.trim() || !subject.trim() || !message.trim()) {
      throw new HttpException('All fields are required', 400);
    }

    if (
      from !== `${currUser.firstName} ${currUser.lastName} (${currUser.email})`
    ) {
      throw new HttpException('Invalid sender information', 400);
    }

    const profanity = new ProfanityEngine();
    const subjectIsProfane = await profanity.hasCurseWords(subject);
    const messageIsProfane = await profanity.hasCurseWords(message);

    if (subjectIsProfane || messageIsProfane) {
      throw new HttpException(
        'Inappropriate language detected in subject or message',
        400,
      );
    }

    await this.resend.emails.send({
      from: `TaleWeaver <${this.configService.get<string>('RESEND_SENDER_EMAIL')}>`,
      to: this.configService.get<string>('RECEIVER_EMAIL')!,
      subject: `[TaleWeaver Feedback] ${subject}`,
      text: `${message}\n\nFrom: ${from}`,
    });
  }

  async sendApologyModeratorEmail(
    currUser: UserPayload,
    reportedUserDataDto: ReportedUserEmailPayload,
  ) {
    const { reportedUserEmail, reportedUserUsername, actionTaken } =
      reportedUserDataDto;

    const caseOfAction =
      actionTaken.toLowerCase() === 'suspension'
        ? 'suspended'
        : actionTaken.toLowerCase() === 'warning'
          ? 'warned'
          : 'banned';

    const apologySubject = 'Apology for the Inconvenience';
    const apologyMessage = `
<p>Dear ${reportedUserUsername},</p>

<p>
  We sincerely apologize for any inconvenience caused by the recent moderation action.
  One of our moderators accidentally ${caseOfAction} you for violating our community guidelines.
  After reviewing the situation, we have taken the appropriate steps to rectify the issue.
</p>

<p>
  If you have any questions or concerns, please feel free to reach out to us through our
  <a href="${this.configService.get<string>('FRONTEND_URL')}/contact">Contact Us</a> page.
</p>

<p>
  Best regards,<br>
  ${currUser.firstName} ${currUser.lastName}<br>
  TaleWeaver Moderation Team
</p>

<p>
  <i>
    Please note that responses to this email will not receive a response.
    If you have any questions or concerns, please use the Contact Us page linked above.
  </i>
</p>
`;

    await this.resend.emails.send({
      from: `TaleWeaver <${this.configService.get<string>('RESEND_SENDER_EMAIL')}>`,
      to: reportedUserEmail,
      subject: apologySubject,
      html: apologyMessage,
    });
  }
}
