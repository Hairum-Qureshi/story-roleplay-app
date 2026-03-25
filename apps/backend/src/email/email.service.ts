import { Injectable } from '@nestjs/common';
import { SendEmail } from 'src/DTOs/SendEmail.dto';
import { UserPayload } from 'src/types';

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(sendEmailDto: SendEmail, currUser: UserPayload) {
    // Logic to send email
  }
}
