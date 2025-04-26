import { Module } from "@nestjs/common";
import { GetProductsController } from "./";
import { ProductsUseCasesModule } from "src/application/use-cases/products-use-cases.module";

@Module({
  imports: [ProductsUseCasesModule],
  controllers: [GetProductsController],
})
export class ProductsControllersModule {}
