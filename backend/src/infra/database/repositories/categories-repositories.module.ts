import { Module } from "@nestjs/common";
import { PrismaModule } from "../config/prisma.module";
import { CategoriesRepositoryProtocol } from "./protocols";
import { CategoryRepository } from "./category-repository";

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CategoriesRepositoryProtocol,
      useClass: CategoryRepository,
    },
  ],
  exports: [CategoriesRepositoryProtocol],
})
export class CategoriesRepositoriesModule {}
