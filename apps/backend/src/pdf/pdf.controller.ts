import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/currentUser.decorator';
import type { UserPayload } from '../types';
import { PdfService } from './pdf.service';
import { IsChatMember } from '../guards/IsChatMember.guard';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get('/:chatID/role-play')
  @UseGuards(AuthGuard(), IsChatMember)
  async getPDF(
    @Param('chatID') chatID: string,
    @Res() res: Response,
    @CurrentUser() user: UserPayload,
  ) {
    const { buffer, rolePlayTitle } = await this.pdfService.generatePDF(
      chatID,
      user,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${rolePlayTitle}.pdf"`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
