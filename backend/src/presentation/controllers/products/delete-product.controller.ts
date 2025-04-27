import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteProductProtocol } from "src/domain/use-cases-protocol/products/";

@Controller("/product")
export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductProtocol) {}

  @Delete(":id")
  async execute(@Param("id") id: string) {
    try {
      await this.deleteProductUseCase.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
