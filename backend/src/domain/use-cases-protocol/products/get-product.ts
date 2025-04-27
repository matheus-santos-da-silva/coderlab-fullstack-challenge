import { GetProductResponseDTO } from "src/domain/DTO/get-product-response-DTO";

export abstract class GetProductProtocol {
  abstract find(id: string): Promise<GetProductResponseDTO>;
}
