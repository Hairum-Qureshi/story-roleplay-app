import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessage {
  @IsNotEmpty()
  @IsString()
  message: string;
}
