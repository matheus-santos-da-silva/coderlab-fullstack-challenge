import { Module } from "@nestjs/common";
import { ProductsRepositoriesModule } from "src/infra/database/repositories/products-repositories.module";
import {
  GetProductsProtocol,
  CreateProductProtocol,
  GetProductProtocol,
  DeleteProductProtocol,
  UpdateProductProtocol,
} from "src/domain/use-cases-protocol/products/";
import {
  GetProductUseCase,
  CreateProductUseCase,
  GetProductsUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
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
    {
      provide: UpdateProductProtocol,
      useClass: UpdateProductUseCase,
    },
  ],
  exports: [
    GetProductsProtocol,
    CreateProductProtocol,
    GetProductProtocol,
    DeleteProductProtocol,
    UpdateProductProtocol,
  ],
})
export class ProductsUseCasesModule {}
