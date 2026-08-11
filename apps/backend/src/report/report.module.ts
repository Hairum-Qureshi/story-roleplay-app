import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserSchema } from 'src/schemas/User';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ReportService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
