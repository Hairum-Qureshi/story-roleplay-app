import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/User';

@Module({
  providers: [ModerationService],
  controllers: [ModerationController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [ModerationService],
})
export class ModerationModule {}
