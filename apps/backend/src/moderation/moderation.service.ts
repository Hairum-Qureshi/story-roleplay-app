import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ReportDocument } from 'src/schemas/Report';
import { EmailService } from 'src/email/email.service';
import { User, UserDocument } from 'src/schemas/User';
import { ModerationStatus } from 'src/enums/moderation.enum';
import { UserPayload } from 'src/types';
import Role from 'src/enums/roles.enum';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Report') private readonly reportModel: Model<ReportDocument>,
    private readonly emailService: EmailService,
  ) {}

  async checkUserModerationStatus(user: UserDocument) {
    if (user.moderation.status === ModerationStatus.BANNED) {
      throw new HttpException('User is banned', 403);
    }

    if (user.moderation.status === ModerationStatus.SUSPENDED) {
      const now = new Date();
      if (user.moderation.expiresAt && user.moderation.expiresAt > now) {
        throw new HttpException(
          `User is suspended until ${user.moderation.expiresAt}`,
          403,
        );
      } else {
        // If the suspension has expired, reset the moderation status
        user.moderation.status = ModerationStatus.NONE;
        user.moderation.reason = '';
        user.moderation.expiresAt = null;
        await user.save();
      }
    }
  }

  async suspendUser(
    duration: string,
    userRole: Role,
    reportID: string,
    suspendedUserID: string,
    currUser: UserPayload,
  ) {
    if (currUser._id === suspendedUserID)
      throw new HttpException('You cannot suspend yourself', 403);

    if (userRole == Role.ADMIN && currUser.role !== Role.ADMIN)
      throw new HttpException(
        'You cannot suspend an admin. Only another admin can do this',
        403,
      );

    if (!duration.trim())
      throw new HttpException('Duration cannot be empty', 400);

    const suspendedUser: UserDocument | null =
      await this.userModel.findById(suspendedUserID);
    if (!suspendedUser) throw new HttpException('User not found', 404);

    await this.userModel.findByIdAndUpdate(suspendedUserID, {
      'moderation.status': ModerationStatus.SUSPENDED,
      'moderation.expiresAt': new Date(Date.now() + parseInt(duration) * 1000),
    });

    await this.reportModel.findByIdAndUpdate(reportID, {
      moderationStatusTaken: ModerationStatus.SUSPENDED,
      sentNoticeEmail: true,
      handledBy: currUser._id,
    });
  }
}
