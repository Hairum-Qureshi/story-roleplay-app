import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ReportService],
  imports: [AuthModule],
  controllers: [ReportController],
})
export class ReportModule {}
