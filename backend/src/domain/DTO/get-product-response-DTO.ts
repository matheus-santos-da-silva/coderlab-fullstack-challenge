import { Category } from "../entities/category";

export interface GetProductResponseDTO {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: Category[];
}
