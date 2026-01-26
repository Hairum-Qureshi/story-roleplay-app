import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CharacterBio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true, min: 18 })
  age: number;

  @Prop({ required: true })
  appearance: string;

  @Prop({ required: true, type: [String] })
  traits: string[];

  @Prop({ ref: 'User' })
  author: string;

  @Prop({ type: String })
  backstory: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(CharacterBio);
export const CharacterBioSchema = SchemaFactory.createForClass(CharacterBio);
export type CharacterBioDocument = HydratedDocument<CharacterBio>;
