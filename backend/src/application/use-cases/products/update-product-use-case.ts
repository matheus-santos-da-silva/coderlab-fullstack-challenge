import { Injectable } from "@nestjs/common";
import { UpdateProductDTO } from "src/domain/DTO/update-product-DTO";
import { UpdateProductProtocol } from "src/domain/use-cases-protocol/products";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class UpdateProductUseCase implements UpdateProductProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async update(id: string, data: UpdateProductDTO): Promise<void> {
    try {
      await this.repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
