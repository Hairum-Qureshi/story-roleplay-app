import { Module } from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { RolePlayAdController } from './role-play-ad.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User';
import { RolePlayAd, RolePlayAdSchema } from 'src/schemas/RolePlayAd';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: RolePlayAd.name,
        schema: RolePlayAdSchema,
      },
    ]),
  ],
  providers: [RolePlayAdService],
  controllers: [RolePlayAdController],
})
export class RolePlayAdModule {}
