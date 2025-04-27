import { Module } from "@nestjs/common";
import { ProductsRepositoriesModule } from "src/infra/database/repositories/products-repositories.module";
import {
  GetProductsProtocol,
  CreateProductProtocol,
  GetProductProtocol,
  DeleteProductProtocol,
} from "src/domain/use-cases-protocol/products/";
import {
  GetProductUseCase,
  CreateProductUseCase,
  GetProductsUseCase,
  DeleteProductUseCase,
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
    {
      provide: DeleteProductProtocol,
      useClass: DeleteProductUseCase,
    },
  ],
  exports: [
    GetProductsProtocol,
    CreateProductProtocol,
    GetProductProtocol,
    DeleteProductProtocol,
  ],
})
export class ProductsUseCasesModule {}
