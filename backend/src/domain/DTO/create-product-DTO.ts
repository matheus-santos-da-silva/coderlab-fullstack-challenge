export interface CreateProductDTO {
  name: string;
  qty: number;
  price: number;
  photo: string;
  categoryIds: string[];
}
