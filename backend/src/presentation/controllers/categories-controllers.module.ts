import { Module } from "@nestjs/common";
import { GetCategoriesController } from "./";
import { CategoriesUseCasesModule } from "src/application/use-cases/categories-use-cases.module";

@Module({
  imports: [CategoriesUseCasesModule],
  controllers: [GetCategoriesController],
})
export class CategoriesControllersModule {}
