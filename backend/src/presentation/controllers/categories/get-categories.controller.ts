import { Controller, Get } from "@nestjs/common";
import { GetCategoriesProtocol } from "src/domain/use-cases-protocol/categories/get-categories";

@Controller("/category")
export class GetCategoriesController {
  constructor(private readonly getCategoriesUseCase: GetCategoriesProtocol) {}

  @Get()
  async execute() {
    try {
      const categories = await this.getCategoriesUseCase.find();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
