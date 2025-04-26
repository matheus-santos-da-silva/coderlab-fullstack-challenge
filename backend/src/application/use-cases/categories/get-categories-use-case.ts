import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { GetCategoriesProtocol } from "src/domain/use-cases-protocol/categories/get-categories";
import { CategoriesRepositoryProtocol } from "src/infra/database/repositories/protocols";

@Injectable()
export class GetCategoriesUseCase implements GetCategoriesProtocol {
  constructor(private readonly repository: CategoriesRepositoryProtocol) {}

  async find(): Promise<Category[] | []> {
    try {
      const categories = await this.repository.find();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
