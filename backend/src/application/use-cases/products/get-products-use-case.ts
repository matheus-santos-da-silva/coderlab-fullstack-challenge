import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product";
import { GetProductsProtocol } from "src/domain/use-cases-protocol/products/get-products";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class GetProductsUseCase implements GetProductsProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async findMany(): Promise<Product[] | []> {
    try {
      const products = await this.repository.findMany();
      return products;
    } catch (error) {
      throw error;
    }
  }
}
