import { Category } from "src/domain/entities/category";

export abstract class GetCategoriesProtocol {
  abstract find(): Promise<Category[] | []>;
}
