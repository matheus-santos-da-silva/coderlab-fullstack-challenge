export abstract class DeleteProductProtocol {
  abstract delete(id: string): Promise<void>;
}
