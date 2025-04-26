import { Module } from "@nestjs/common";
import { GetProductsProtocol } from "src/domain/use-cases-protocol/products/";
import { ProductsRepositoriesModule } from "src/infra/database/repositories/products-repositories.module";
import { GetProductsUseCase } from "./products/get-products-use-case";

@Module({
  imports: [ProductsRepositoriesModule],
  providers: [
    {
      provide: GetProductsProtocol,
      useClass: GetProductsUseCase,
    },
  ],
  exports: [GetProductsProtocol],
})
export class ProductsUseCasesModule {}
