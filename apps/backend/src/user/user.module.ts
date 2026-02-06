import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User';
import { CharacterBio, CharacterBioSchema } from '../schemas/CharacterBio';
import { RolePlayAd, RolePlayAdSchema } from '../schemas/RolePlayAd';
import { AuthModule } from '../auth/auth.module';
import {
  Conversation,
  ConversationSchema,
} from '../schemas/inbox/Conversation';

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
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
