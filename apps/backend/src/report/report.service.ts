import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDocument } from 'src/schemas/Report';
import { CreateReport } from 'src/DTOs/CreateReport.dto';
import { User, UserDocument } from 'src/schemas/User';
import { ReportMap, RolePlayAd } from 'src/types';
import { ReportReason } from 'src/enums/reason.enum';
import { AdStatus } from 'src/enums/adStatus.enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel('Report') private reportModel: Model<ReportDocument>,
    @InjectModel('RolePlayAd') private rolePlayAdModel: Model<RolePlayAd>,
  ) {}

  private async getAdByID(adID: string): Promise<RolePlayAd | null> {
    const ad = await this.rolePlayAdModel.findById(adID).lean();

    if (!ad) throw new NotFoundException(`Ad with ID ${adID} not found`);

    return ad;
  }

  async createReport(reportData: CreateReport, currUserID: string) {
    const { reason, reportDetails, adLink, claimedOriginalAdPoster } =
      reportData;

    const adID: string = adLink.split('/').pop()!;

    const ad = await this.getAdByID(adID);

    if (!ad) return;

    delete ad['__v'];

    if (ad.author === currUserID)
      throw new HttpException(
        'You cannot report your own ad',
        HttpStatus.BAD_REQUEST,
      );

    const reportedAd = await this.reportModel.findOne({
      reporter: currUserID,
      adID,
    });

    if (reportedAd)
      throw new HttpException(
        'You have already reported this ad',
        HttpStatus.BAD_REQUEST,
      );

    const reasonMap: ReportMap = {
      'Underage or minor-related sexual content': ReportReason.Underage,
      'Purely sexual or smut-focused ad': ReportReason.SexualContent,
      'Hate speech, slurs, or extremist content': ReportReason.HateSpeech,
      'This ad is plagiarized or stolen content': ReportReason.Plagiarism,
      'Doxxing or sharing personal/contact information': ReportReason.Doxxing,
      'Unrelated content or spam': ReportReason.Spam,
      'AI generated content': ReportReason.AIContent,
      Other: ReportReason.Other,
    };

    await this.reportModel.create({
      reporter: currUserID,
      reason: reasonMap[reason],
      adSnapshot: ad,
      adID,
      reportDetails,
      reported: claimedOriginalAdPoster || ad.author,
      adLink,
    });
  }

  async getAllReports(status: AdStatus | undefined) {
    // TODO - later implement pagination

    return !status
      ? await this.reportModel
          .find({
            status: AdStatus.OPEN,
          })
          .populate({
            path: 'reporter',
            select: '_id username profilePicture',
          })
          .populate({
            path: 'reported',
            select: '_id username profilePicture',
          })
          .populate({
            path: 'handledBy',
            select: '_id username profilePicture',
          })
      : await this.reportModel
          .find({ status })
          .populate({
            path: 'reporter',
            select: '_id username profilePicture',
          })
          .populate({
            path: 'reported',
            select: '_id username profilePicture',
          })
          .populate({
            path: 'handledBy',
            select: '_id username profilePicture',
          });
          
  }

  async getReportByID(reportID: string) {
    const report: ReportDocument | null = await this.reportModel
      .findById(reportID)
      .populate({
        path: 'reporter',
        select: '_id username profilePicture',
      })
      .populate({
        path: 'reported',
        select: '_id username profilePicture email firstName lastName',
      })
      .lean();

    if (!report)
      throw new NotFoundException(`Report with ID ${reportID} not found`);

    return await report;
  }
}
