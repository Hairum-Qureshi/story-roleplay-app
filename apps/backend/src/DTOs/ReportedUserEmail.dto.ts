import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
}
