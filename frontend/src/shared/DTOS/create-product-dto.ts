export interface CreateProductDTO {
  categoryIds: string[];
  name: string;
  qty: number;
  price: number;
  photo: File | undefined;
}
