import { Category } from "./category-dto";

export interface Product {
  id: string;
  categories: Category[];
  name: string;
  qty: number;
  price: number;
  photo: string;
}
