import { Category } from "src/domain/entities/category";

export abstract class CategoriesRepositoryProtocol {
  abstract find(): Promise<Category[] | []>;
}
