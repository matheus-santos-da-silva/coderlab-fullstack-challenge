import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDTO } from "src/domain/DTO/create-product-DTO";
import { CreateProductService } from "src/domain/services/create-product.service";
import { CreateProductProtocol } from "src/domain/use-cases-protocol/products/create-product";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class CreateProductUseCase implements CreateProductProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async create(data: CreateProductDTO): Promise<void> {
    try {
      const product = await this.repository.create(data);
      if (!product) {
        throw new BadRequestException(
          "Erro na criação do produto, tente novamente mais tarde!"
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
