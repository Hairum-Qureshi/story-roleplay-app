import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAd {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  pov: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdult: boolean;

  @IsNotEmpty()
  @IsString()
  premise: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  writingExpectations: string[];

  @IsString()
  @IsNotEmpty()
  contentNotes: string;
}
