import { Module } from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { RolePlayAdController } from './role-play-ad.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RolePlayAdService],
  controllers: [RolePlayAdController],
})
export class RolePlayAdModule {}
