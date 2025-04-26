import { Product } from "src/domain/entities/product";

export abstract class ProductsRepositoryProtocol {
  abstract findMany(): Promise<Product[] | []>;
}
