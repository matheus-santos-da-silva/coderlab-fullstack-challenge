import { Decimal } from "@prisma/client/runtime/library";
import { Category } from "./category";

interface ProductProps {
  name: string;
  qty: number;
  price: Decimal;
  photo: string;
  categories: Category[];
}

export class Product {
  id: string;
  name: string;
  qty: number;
  price: Decimal;
  photo: string;
  categories: Category[];

  constructor({ name, qty, price, photo, categories }: ProductProps) {
    this.name = name;
    this.qty = qty;
    this.price = price;
    this.photo = photo;
    this.categories = categories;
  }
}
