import { Module } from "@nestjs/common";
import { CategoriesControllersModule } from "./presentation/controllers/categories-controllers.module";

@Module({
  imports: [CategoriesControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
