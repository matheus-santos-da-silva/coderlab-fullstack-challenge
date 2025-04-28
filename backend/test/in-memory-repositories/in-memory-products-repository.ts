import { Decimal } from "@prisma/client/runtime/library";
import { CreateProductDTO } from "src/domain/DTO/create-product-DTO";
import { UpdateProductDTO } from "src/domain/DTO/update-product-DTO";
import { Product } from "src/domain/entities/product";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CategoryMock } from "../mocks/mock-category";

export class InMemoryProductsRepository implements ProductsRepositoryProtocol {
  products: Product[] = [];

  async create(data: CreateProductDTO): Promise<Product> {
    const product: Product = {
      name: data.name,
      photo: data.photo,
      qty: data.qty,
      price: new Decimal(data.price),
      id: "test-id",
      categories: [CategoryMock],
    };

    this.products.push(product);
    return product;
  }

  async findMany(): Promise<Product[] | []> {
    return this.products;
  }

  async find(id: string): Promise<Product> {
    const user = this.products.find((product) => product.id === id);
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
  }

  async update(id: string, data: UpdateProductDTO): Promise<void> {
    const index = this.products.findIndex((product) => product.id === id);

    const updatedProduct = {
      ...this.products[index],
      ...data,
      price: data.price ? new Decimal(data.price) : this.products[index].price,
      id: this.products[index].id,
    };

    this.products[index] = updatedProduct;
  }
}
