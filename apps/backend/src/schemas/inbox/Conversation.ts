import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Conversation {
  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'RolePlayAd', required: true })
  roleplayAd: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [Types.ObjectId], ref: 'Message', default: [] })
  messages: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  chatEnded: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'CharacterBio' })
  characterBios: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

SchemaFactory.createForClass(Conversation);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export type ConversationDocument = HydratedDocument<Conversation>;
