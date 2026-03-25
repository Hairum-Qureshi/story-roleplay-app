import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [AuthModule],
})
export class EmailModule {}
