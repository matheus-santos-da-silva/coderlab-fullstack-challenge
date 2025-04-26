import { PrismaService } from "../config/prisma.service";
import { Category } from "src/domain/entities/category";
import { CategoriesRepositoryProtocol } from "./protocols";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository implements CategoriesRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Category[] | []> {
    try {
      const categories = await this.prisma.category.findMany({});
      return categories;
    } catch (error) {
      throw new BadRequestException(
        "Erro ao encontrar as informações, tente novamente!"
      );
    }
  }
}
