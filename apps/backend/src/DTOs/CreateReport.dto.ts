import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateReport {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  reportDetails: string;

  @IsString()
  @IsUrl()
  adLink: string;

  @IsString()
  @IsOptional()
  claimedOriginalAdPoster: string;
}
