import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReport } from 'src/DTOs/CreateReport.dto';
import { ModerationGuard } from 'src/guards/moderation.guard';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import Role from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';
import { AdStatus } from 'src/enums/adStatus.enum';

@Controller('api/report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('all')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  getAllReports(@Query('status') status?: AdStatus) {
    return this.reportService.getAllReports(status);
  }

  @Get(':reportID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  getReport() {}

  @Post(':reportID/notes')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  addReportNotes() {}

  @Post('create')
  @UseGuards(AuthGuard(), ModerationGuard)
  async createReport(
    @Body() createReportDto: CreateReport,
    @CurrentUser() currUser: types.UserPayload,
  ) {
    await this.reportService.createReport(createReportDto, currUser._id);
  }

  @Post(':reportID/resolve')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  resolveReport() {}

  @Post(':reportID/reopen')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  reopenReport() {}

  @Post('/clear-moderation/:userID')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  clearModeration() {}

  @Post(':reportID/close')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  closeReport() {}
}
