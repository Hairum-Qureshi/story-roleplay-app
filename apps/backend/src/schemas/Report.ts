import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolePlayAd, RolePlayAdSchema } from './RolePlayAd';
import { ReportReason } from 'src/enums/reason.enum';
import { AdStatus } from 'src/enums/adStatus.enum';
import { ModerationStatus } from 'src/enums/moderation.enum';

@Schema()
export class Report {
  @Prop({ ref: 'User' })
  reporter: string;

  @Prop({ required: true, enum: ReportReason })
  reason: ReportReason;

  @Prop({ type: RolePlayAdSchema })
  adSnapshot: RolePlayAd;

  @Prop({ type: String, required: true })
  adID: string;

  @Prop({ type: String })
  reportDetails: string;

  @Prop({ type: String, ref: 'User' })
  reported: string;

  @Prop({ type: String })
  reportNotes: string;

  @Prop({ required: true, enum: AdStatus, default: AdStatus.OPEN })
  status: AdStatus;

  @Prop({ type: String, required: true })
  adLink: string;

  @Prop({ type: Boolean, default: false })
  sentNoticeEmail: boolean;

  @Prop({ type: Boolean, default: false })
  sentPostDeletionNoticeEmail: boolean;

  @Prop({ type: Boolean, default: false })
  sentApologyEmail: boolean;

  @Prop({ enum: ModerationStatus, default: ModerationStatus.NONE })
  moderationStatusTaken: ModerationStatus;

  @Prop({ type: String, ref: 'User' })
  handledBy: string;

  @Prop({ type: String })
  handledNotes: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(Report);
export const ReportSchema = SchemaFactory.createForClass(Report);
export type ReportDocument = HydratedDocument<Report>;
