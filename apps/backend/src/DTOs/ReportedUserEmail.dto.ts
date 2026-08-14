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
  @IsEnum({
    SUSPENSION: 'SUSPENSION',
    WARNING: 'WARNING',
    BAN: 'BAN',
  })
  actionTaken: string;
}
