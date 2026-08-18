import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/User';
import { ReportSchema } from 'src/schemas/Report';
import { Mongoose } from 'mongoose';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [ModerationService],
  controllers: [ModerationController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
    EmailModule,  
  ],
  exports: [ModerationService],
})
export class ModerationModule {}
