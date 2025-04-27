import { Module } from "@nestjs/common";
import { ProductsRepositoriesModule } from "src/infra/database/repositories/products-repositories.module";
import {
  GetProductsProtocol,
  CreateProductProtocol,
  GetProductProtocol,
} from "src/domain/use-cases-protocol/products/";
import {
  GetProductUseCase,
  CreateProductUseCase,
  GetProductsUseCase,
} from "./";

@Module({
  imports: [ProductsRepositoriesModule],
  providers: [
    {
      provide: GetProductsProtocol,
      useClass: GetProductsUseCase,
    },
    {
      provide: CreateProductProtocol,
      useClass: CreateProductUseCase,
    },
    {
      provide: GetProductProtocol,
      useClass: GetProductUseCase,
    },
  ],
  exports: [GetProductsProtocol, CreateProductProtocol, GetProductProtocol],
})
export class ProductsUseCasesModule {}
