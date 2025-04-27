import {
  Body,
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { UpdateProductProtocol } from "src/domain/use-cases-protocol/products/update-product";
import { UpdateProductControllerDTO } from "src/domain/DTO/update-product-controller";

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
export class UpdateProductController {
  constructor(private readonly updateProductUseCase: UpdateProductProtocol) {}

  @Patch(":id")
  async execute(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string,
    @Body(new ValidationPipe({ transform: true }))
    data: UpdateProductControllerDTO
  ) {
    try {
      const payload = {
        ...data,
        ...(file && { photo: `uploads/${file.filename}` }),
      };

      await this.updateProductUseCase.update(id, payload);
    } catch (error) {
      throw error;
    }
  }
}
