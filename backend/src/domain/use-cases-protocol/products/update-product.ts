import { UpdateProductDTO } from "src/domain/DTO/update-product-DTO";

export abstract class UpdateProductProtocol {
  abstract update(id: string, data: UpdateProductDTO): Promise<void>;
}
