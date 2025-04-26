import { Product } from "src/domain/entities/product";

export abstract class GetProductsProtocol {
  abstract findMany(): Promise<Product[] | []>;
}
