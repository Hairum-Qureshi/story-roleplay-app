import { Injectable } from '@nestjs/common';
import { SendEmail } from 'src/DTOs/SendEmail.dto';
import { UserPayload } from 'src/types';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

@Injectable()
export class EmailService {
  constructor() {}

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
    
    console.log(`Email sent to ${from} with subject "${subject}" and message: ${message}`);
  }
}
