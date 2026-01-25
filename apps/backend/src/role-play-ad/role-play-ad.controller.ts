import { Body, Controller, Post } from '@nestjs/common';
import { RolePlayAdService } from './role-play-ad.service';
import { CreateAd } from 'src/DTOs/CreateAd.dto';

@Controller('role-play-ad')
export class RolePlayAdController {
  constructor(private readonly rolePlayAdService: RolePlayAdService) {}

  @Post('create')
  createAd(@Body() createAdDto: CreateAd) {
    return this.rolePlayAdService.createAd(createAdDto);
  }
}
