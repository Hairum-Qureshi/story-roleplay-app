import { IsNotEmpty, IsString } from 'class-validator';

export class EditMessage {
  @IsNotEmpty()
  @IsString()
  message: string;
}
