import { Module } from "@nestjs/common";
import { ProductsUseCasesModule } from "src/application/use-cases/products-use-cases.module";
import {
  GetProductsController,
  CreateProductController,
  GetProductController,
  DeleteProductController,
} from "./";

@Module({
  imports: [ProductsUseCasesModule],
  controllers: [
    GetProductsController,
    CreateProductController,
    GetProductController,
    DeleteProductController,
  ],
})
export class ProductsControllersModule {}
