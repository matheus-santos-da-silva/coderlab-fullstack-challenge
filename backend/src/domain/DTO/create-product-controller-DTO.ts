import { Transform } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";

export class CreateProductControllerDTO {
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
  photo: Express.Multer.File[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Transform(({ value }) => Array(value))
  categoryIds: string[];
}
