import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { CreateAd } from 'src/DTOs/CreateAd.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { type UserPayload } from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { IsOwnerGuard } from 'src/guards/IsOwner.guard';
import { EditAd } from 'src/DTOs/EditAd.dto';

@Controller('role-play-ad')
export class RolePlayAdController {
  constructor(private readonly rolePlayAdService: RolePlayAdService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  createAd(@Body() createAdDto: CreateAd, @CurrentUser() user: UserPayload) {
    return this.rolePlayAdService.createAd(createAdDto, user);
  }

  @Get(':adID')
  @UseGuards(AuthGuard(), IsOwnerGuard)
  getAdByID(@Param('adID') adID: string) {
    return this.rolePlayAdService.getAdByID(adID);
  }

  @Patch(':adID/edit')
  @UseGuards(AuthGuard(), IsOwnerGuard)
  editAd(@Param('adID') adID: string, @Body() editAdDto: EditAd) {
    return this.rolePlayAdService.editAd(adID, editAdDto);
  }

  @Get('all/yours')
  @UseGuards(AuthGuard())
  getPostedAds(@CurrentUser() user: UserPayload) {
    return this.rolePlayAdService.getPostedAdsByUser(user);
  }

  @Get('all')
  getAllAds() {
    return this.rolePlayAdService.getAllAds();
  }

  @Delete('delete/:adID')
  @UseGuards(AuthGuard(), IsOwnerGuard)
  deleteAd(@Param('adID') adID: string) {
    return this.rolePlayAdService.deleteAd(adID);
  }
}
