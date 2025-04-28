import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { CreateProductProtocol } from "src/domain/use-cases-protocol/products/create-product";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductControllerDTO } from "src/domain/DTO/create-product-controller-DTO";
import { diskStorage } from "multer";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

@Controller("/product")
@UseInterceptors(
  FileInterceptor("photo", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = `${randomUUID()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
  })
)
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductProtocol) {}

  @Post()
  async execute(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe({ transform: true }))
    data: CreateProductControllerDTO
  ) {
    if (!file) {
      throw new BadRequestException("Imagem do produto é obrigatória.");
    }

    try {
      await this.createProductUseCase.create({
        ...data,
        photo: `uploads/${file.filename}`,
      });
    } catch (error) {
      throw error;
    }
  }
}
