import { CreateProductDTO } from "src/domain/DTO/create-product-DTO";

export abstract class CreateProductProtocol {
  abstract create(data: CreateProductDTO): Promise<void>;
}
