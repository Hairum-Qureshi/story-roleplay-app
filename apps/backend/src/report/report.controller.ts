import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModerationGuard } from 'src/guards/moderation.guard';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import Role from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('api/report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('all')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  getAllReports(@Query('status') status?: 'OPEN' | 'CLOSED' | 'RESOLVED') {}

  @Get(':reportID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  getReport() {}

  @Post(':reportID/notes')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  addReportNotes() {}

  @Post()
  @UseGuards(AuthGuard(), ModerationGuard)
  createReport() {}

  @Post(':reportID/resolve')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  resolveReport() {}

  @Post(':reportID/reopen')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  reopenReport() {}

  @Post('ban-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  banUser() {
    // TODO - make sure to ad a guard where admins cannot be banned
  }

  @Post('suspend-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  suspendUser() {
    // TODO - make sure to ad a guard where admins cannot be suspended
  }

  @Post('warn-user/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  warnUser() {}

  @Post('/clear-moderation/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  clearModeration() {}

  @Post(':reportID/close')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  closeReport() {}
}
