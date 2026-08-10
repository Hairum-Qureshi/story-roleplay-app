import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolePlayAd, RolePlayAdSchema } from './RolePlayAd';
import { ReportReason } from 'src/enums/reason.enum';
import { AdStatus } from 'src/enums/adStatus.enum';

@Schema()
export class Report {
  @Prop({ ref: 'User' })
  reporterUserID: string;

  @Prop({ ref: 'User' })
  reportedUserID: string;

  @Prop({ required: true, enum: ReportReason })
  reason: ReportReason;

  @Prop({ type: RolePlayAdSchema })
  adSnapshot: RolePlayAd;

  @Prop({ type: String, required: true })
  adID: string;

  @Prop({ type: String })
  reportDetails: string;

  @Prop({ type: String, ref: 'User' })
  originalAdPoster: string;

  @Prop({ type: String })
  reportNotes: string;

  @Prop({ required: true, enum: AdStatus, default: AdStatus.OPEN })
  status: AdStatus;

  @Prop({ type: String, required: true })
  adLink: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(Report);
export const ReportSchema = SchemaFactory.createForClass(Report);
export type ReportDocument = HydratedDocument<Report>;
