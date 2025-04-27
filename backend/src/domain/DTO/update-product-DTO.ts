export interface UpdateProductDTO {
  name: string;
  qty: number;
  price: number;
  photo?: string;
  categoryIds: string[];
}
