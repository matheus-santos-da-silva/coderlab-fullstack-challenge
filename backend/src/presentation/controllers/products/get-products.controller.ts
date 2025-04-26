import { Controller, Get } from "@nestjs/common";
import { GetProductsProtocol } from "src/domain/use-cases-protocol/products/get-products";

@Controller("/product")
export class GetProductsController {
  constructor(private readonly getProductsUseCase: GetProductsProtocol) {}

  @Get()
  async execute() {
    try {
      const products = await this.getProductsUseCase.findMany();
      return products;
    } catch (error) {
      throw error;
    }
  }
}
