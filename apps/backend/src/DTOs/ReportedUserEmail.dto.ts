import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReportedUserEmailPayload {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  reportedUserEmail: string;

  @IsOptional()
  @IsString()
  reportedUserUsername: string;

  @IsNotEmpty()
  @IsString()
  reportID: string;

  @IsOptional()
  @IsString()
  @IsEnum({
    SUSPENSION: 'SUSPEND',
    WARNING: 'WARN',
    BAN: 'BAN',
  })
  actionTaken: string;

  @IsOptional()
  @IsString()
  emailSubject?: string;

  @IsOptional()
  @IsString()
  emailBody?: string;
}
