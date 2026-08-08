import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRolePermissions } from 'src/guards/isAuthorized.guard';
import Role from 'src/roles.enum';
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

  @Post('new')
  @UseGuards(AuthGuard())
  createReport() {}

  @Post(':reportID/resolve')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  resolveReport() {}

  @Post(':reportID/reopen')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  reopenReport() {}

  @Post(':reportID/close')
  @UseGuards(AuthGuard(), HasRolePermissions)
  @Roles([Role.ADMIN, Role.MODERATOR])
  closeReport() {}
}
