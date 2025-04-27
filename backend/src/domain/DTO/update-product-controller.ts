import { Transform } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from "class-validator";

export class UpdateProductControllerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  qty: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ValidateNested({ each: true })
  @IsOptional()
  photo?: Express.Multer.File;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => Array(value))
  categoryIds: string[];
}
