import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;
}

SchemaFactory.createForClass(Message);
export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = HydratedDocument<Message>;
