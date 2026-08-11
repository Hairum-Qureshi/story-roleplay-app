import { Controller } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import Role from 'src/enums/roles.enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Post } from '@nestjs/common';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('ban-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  banUser() {
    // TODO - make sure to add a guard where admins cannot be banned
  }

  @Post('suspend-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  suspendUser() {
    // TODO - make sure to add a guard where admins cannot be suspended
  }

  @Post('warn-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  warnUser() {}
}
