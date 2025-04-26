import { PrismaService } from "../config/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductsRepositoryProtocol } from "./protocols";
import { Product } from "src/domain/entities/product";

@Injectable()
export class ProductsRepository implements ProductsRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Product[] | []> {
    try {
      const products = await this.prisma.product.findMany({
        include: { categories: true },
      });
      return products;
    } catch (error) {
      throw new BadRequestException(
        "Erro ao encontrar as informações, tente novamente!"
      );
    }
  }
}
