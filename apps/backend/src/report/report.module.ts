import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/schemas/User';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ReportService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ReportController],
})
export class ReportModule {}
