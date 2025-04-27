import { Controller, Get, Param } from "@nestjs/common";
import { GetProductProtocol } from "src/domain/use-cases-protocol/products/get-product";

@Controller("/product")
export class GetProductController {
  constructor(private readonly getProductUseCase: GetProductProtocol) {}

  @Get(":id")
  async execute(@Param("id") id: string) {
    try {
      const product = await this.getProductUseCase.find(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
}
