export interface UpdateProductDTO {
  categoryIds: string[];
  name?: string;
  qty?: number;
  price?: number;
  photo?: File;
}
