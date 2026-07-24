import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessage {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  senderUID?: string;
}
