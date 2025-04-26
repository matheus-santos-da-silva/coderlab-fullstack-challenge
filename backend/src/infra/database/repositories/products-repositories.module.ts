import { Module } from "@nestjs/common";
import { PrismaModule } from "../config/prisma.module";
import { ProductsRepositoryProtocol } from "./protocols";
import { ProductsRepository } from "./products-repository";

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ProductsRepositoryProtocol,
      useClass: ProductsRepository,
    },
  ],
  exports: [ProductsRepositoryProtocol],
})
export class ProductsRepositoriesModule {}
