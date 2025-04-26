import { Module } from "@nestjs/common";
import { GetCategoriesProtocol } from "src/domain/use-cases-protocol/categories/get-categories";
import { CategoriesRepositoriesModule } from "src/infra/database/repositories/categories-repositories.module";
import { GetCategoriesUseCase } from "./";

@Module({
  imports: [CategoriesRepositoriesModule],
  providers: [
    {
      provide: GetCategoriesProtocol,
      useClass: GetCategoriesUseCase,
    },
  ],
  exports: [GetCategoriesProtocol],
})
export class CategoriesUseCasesModule {}
