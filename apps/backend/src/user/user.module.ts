import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User';
import { CharacterBio, CharacterBioSchema } from 'src/schemas/CharacterBio';
import { RolePlayAd, RolePlayAdSchema } from 'src/schemas/RolePlayAd';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: CharacterBio.name,
        schema: CharacterBioSchema,
      },
      {
        name: RolePlayAd.name,
        schema: RolePlayAdSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
