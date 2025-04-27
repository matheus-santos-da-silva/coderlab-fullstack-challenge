import { BadRequestException, Injectable } from "@nestjs/common";
import { DeleteProductProtocol } from "src/domain/use-cases-protocol/products";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols/products-repository-protocol";

@Injectable()
export class DeleteProductUseCase implements DeleteProductProtocol {
  constructor(private readonly repository: ProductsRepositoryProtocol) {}

  async delete(id: string): Promise<void> {
    try {
      const product = await this.repository.find(id);
      if (!product) throw new BadRequestException("Produto não existe!");

      await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
