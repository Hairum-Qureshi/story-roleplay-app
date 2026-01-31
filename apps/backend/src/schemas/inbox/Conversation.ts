import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Conversation {
  @Prop({ type: [String], ref: 'User', required: true })
  participants: string[];

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

  @Prop({ type: [String], default: [] })
  hiddenFor: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
  private _id: string;
}

SchemaFactory.createForClass(Conversation);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export type ConversationDocument = HydratedDocument<Conversation>;
