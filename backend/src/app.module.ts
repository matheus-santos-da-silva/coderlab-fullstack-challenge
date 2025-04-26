import { Module } from "@nestjs/common";
import { CategoriesControllersModule } from "./presentation/controllers/categories-controllers.module";
import { ProductsControllersModule } from "./presentation/controllers/products-controllers.module";

@Module({
  imports: [CategoriesControllersModule, ProductsControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
