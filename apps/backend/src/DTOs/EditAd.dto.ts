import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PovType } from '../types';

export class EditAd {
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
