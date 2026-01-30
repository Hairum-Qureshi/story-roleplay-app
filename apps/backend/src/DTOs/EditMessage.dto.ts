import { IsNotEmpty, IsString } from 'class-validator';

export class EditMessage {
  @IsNotEmpty()
  @IsString()
  editedMessage: string;
}
