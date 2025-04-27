import { BadRequestException, Injectable } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/library";
import { GetProductResponseDTO } from "src/domain/DTO/get-product-response-DTO";
import { GetProductProtocol } from "src/domain/use-cases-protocol/products/get-product";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class GetProductUseCase implements GetProductProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async find(id: string): Promise<GetProductResponseDTO> {
    try {
      const product = await this.repository.find(id);
      if (!product) {
        throw new BadRequestException("Produto não existe!");
      }

      const newProduct = {
        ...product,
        price: new Decimal(product.price).toNumber(),
      };

      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}
