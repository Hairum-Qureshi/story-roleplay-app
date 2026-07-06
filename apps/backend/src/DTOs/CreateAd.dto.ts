import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsEnum,
} from 'class-validator';
import { PovType } from '../types';

export class CreateAd {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(PovType)
  pov: PovType;

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
