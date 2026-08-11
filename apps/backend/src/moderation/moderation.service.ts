import { HttpException, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/schemas/User';
import { ModerationStatus } from 'src/enums/moderation.enum';

@Injectable()
export class ModerationService {
  constructor() {}

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
}
