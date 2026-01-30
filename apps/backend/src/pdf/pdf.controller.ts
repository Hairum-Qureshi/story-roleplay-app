import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import type { UserPayload } from 'src/types';
import { PdfService } from './pdf.service';

@Controller('api/pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  // TODO - may need to create a guard checking if the user is in the chat
  @Post('generate/:chatID')
  @UseGuards(AuthGuard())
  generatePdf(
    @Param('chatID') chatID: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.pdfService.generatePDF(chatID, user);
  }

  @Get('/:chatID/role-play')
  @UseGuards(AuthGuard())
  async getPDF(
    @Param('chatID') chatID: string,
    @Res() res: Response,
    @CurrentUser() user: UserPayload,
  ): Promise<void> {
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
