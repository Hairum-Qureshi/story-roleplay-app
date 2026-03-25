import { Injectable } from '@nestjs/common';
import { SendEmail } from 'src/DTOs/SendEmail.dto';
import { UserPayload } from 'src/types';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY')!);
  }

  async sendEmail(sendEmailDto: SendEmail, currUser: UserPayload) {
    const { from, subject, message } = sendEmailDto;

    if (!from.trim() || !subject.trim() || !message.trim()) {
      throw new Error('Missing required fields');
    }

    if (
      from !== `${currUser.firstName} ${currUser.lastName} (${currUser.email})`
    ) {
      throw new Error('Invalid sender information');
    }

    const profanity = new ProfanityEngine({ lang: 'en' });
    const subjectIsProfane = await profanity.hasCurseWords(subject);
    const messageIsProfane = await profanity.hasCurseWords(message);

    if (subjectIsProfane || messageIsProfane) {
      throw new Error('Email contains inappropriate language');
    }

    this.resend.emails.send({
      from: `TaleWeaver <${this.configService.get<string>('RESEND_SENDER_EMAIL')}>`,
      to: this.configService.get<string>('RECEIVER_EMAIL')!,
      subject: `[TaleWeaver Feedback] ${subject}`,
      text: `${message}\n\nFrom: ${from}`,
    });
  }
}
