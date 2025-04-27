import { Module } from "@nestjs/common";
import {
  GetProductsController,
  CreateProductController,
  GetProductController,
} from "./";
import { ProductsUseCasesModule } from "src/application/use-cases/products-use-cases.module";

@Module({
  imports: [ProductsUseCasesModule],
  controllers: [
    GetProductsController,
    CreateProductController,
    GetProductController,
  ],
})
export class ProductsControllersModule {}
