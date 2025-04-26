import { Module } from "@nestjs/common";
import { GetProductsProtocol } from "src/domain/use-cases-protocol/products/";
import { ProductsRepositoriesModule } from "src/infra/database/repositories/products-repositories.module";
import { GetProductsUseCase } from "./products/get-products-use-case";
import { CreateProductProtocol } from "src/domain/use-cases-protocol/products/create-product";
import { CreateProductUseCase } from "./products/create-product-use-case";

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
  ],
  exports: [GetProductsProtocol, CreateProductProtocol],
})
export class ProductsUseCasesModule {}
