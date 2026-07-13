import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Notification {
  @Prop()
  userID: string;

  @Prop()
  convoID: string;
}

SchemaFactory.createForClass(Notification);
export const NotificationSchema = SchemaFactory.createForClass(Notification);
export type NotificationDocument = HydratedDocument<Notification>;
