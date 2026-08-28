import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserSchema } from 'src/schemas/User';
import { ReportSchema } from 'src/schemas/Report';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePlayAdSchema } from 'src/schemas/RolePlayAd';

@Module({
  providers: [ReportService],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
    MongooseModule.forFeature([
      { name: 'RolePlayAd', schema: RolePlayAdSchema },
    ]),
  ],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
