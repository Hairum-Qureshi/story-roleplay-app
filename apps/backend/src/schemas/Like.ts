import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Like {
  @Prop({ type: String })
  _id: string;

  @Prop()
  userID: string;

  @Prop()
  adID: string;
}

SchemaFactory.createForClass(Like);
export const LikeSchema = SchemaFactory.createForClass(Like);
export type LikeDocument = HydratedDocument<Like>;
