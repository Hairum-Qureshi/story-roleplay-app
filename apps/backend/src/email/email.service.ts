import { HttpException, Injectable } from '@nestjs/common';
import { SendEmail } from 'src/DTOs/SendEmail.dto';
import { UserPayload } from 'src/types';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY')!);
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

    const profanity = new ProfanityEngine({ lang: 'en' });
    const subjectIsProfane = await profanity.hasCurseWords(subject);
    const messageIsProfane = await profanity.hasCurseWords(message);

    if (subjectIsProfane || messageIsProfane) {
      throw new HttpException(
        'Inappropriate language detected in subject or message',
        400,
      );
    }

    this.resend.emails.send({
      from: `TaleWeaver <${this.configService.get<string>('RESEND_SENDER_EMAIL')}>`,
      to: this.configService.get<string>('RECEIVER_EMAIL')!,
      subject: `[TaleWeaver Feedback] ${subject}`,
      text: `${message}\n\nFrom: ${from}`,
    });
  }
}
