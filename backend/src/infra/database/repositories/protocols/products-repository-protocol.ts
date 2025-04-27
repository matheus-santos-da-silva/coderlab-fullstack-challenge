import { CreateProductDTO } from "src/domain/DTO/create-product-DTO";
import { UpdateProductDTO } from "src/domain/DTO/update-product-DTO";
import { Product } from "src/domain/entities/product";

export abstract class ProductsRepositoryProtocol {
  abstract findMany(): Promise<Product[] | []>;
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract find(id: string): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: UpdateProductDTO): Promise<void>;
}
