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

  @IsNotEmpty()
  @IsString()
  reportedUserUsername: string;

  @IsNotEmpty()
  @IsString()
  reportID: string;

  @IsNotEmpty()
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
