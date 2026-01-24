import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStltpfa69E9JTQOf5ZcyLGR8meBbxMFJxM0w&s',
  })
  profilePicture: string;

  @Prop({ type: [Types.ObjectId], ref: 'CharacterBio' })
  characterBios: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Conversation' })
  conversations: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'RolePlayAd' })
  rolePlayAds: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

SchemaFactory.createForClass(User);
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
