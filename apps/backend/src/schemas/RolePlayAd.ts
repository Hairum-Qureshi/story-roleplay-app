import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum PovType {
  FirstPerson = 'First Person',
  SecondPerson = 'Second Person',
  ThirdPerson = 'Third Person',
}

@Schema()
export class RolePlayAd {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: PovType })
  pov: PovType;

  @Prop({ required: true })
  adultRoleplay: boolean;

  @Prop({ required: true })
  premise: string;

  @Prop({ type: [String], required: true })
  writingExpectations: string[];

  @Prop({ required: true })
  contentNotes: string;

  @Prop({ ref: 'User' })
  author: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isReposted: boolean;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(RolePlayAd);
export const RolePlayAdSchema = SchemaFactory.createForClass(RolePlayAd);
export type RolePlayAdDocument = HydratedDocument<RolePlayAd>;
