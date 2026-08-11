import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateReport {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  reportDetails: string;

  @IsString()
  @IsUrl({ require_tld: process.env.NODE_ENV === 'production' })
  adLink: string;

  @IsString()
  @IsOptional()
  claimedOriginalAdPoster: string;
}
