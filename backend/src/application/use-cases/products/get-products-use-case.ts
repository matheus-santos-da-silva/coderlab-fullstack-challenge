import { Injectable } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/library";
import { Product } from "src/domain/entities/product";
import { GetProductsProtocol } from "src/domain/use-cases-protocol/products/get-products";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class GetProductsUseCase implements GetProductsProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async findMany(): Promise<Product[] | []> {
    try {
      const products = await this.repository.findMany();
      if (products.length > 0) {
        const newProducts = products.map((product) => ({
          ...product,
          price: new Decimal(product.price).toNumber(),
        }));

        return newProducts;
      }

      return products;
    } catch (error) {
      throw error;
    }
  }
}
