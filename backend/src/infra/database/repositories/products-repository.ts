import { PrismaService } from "../config/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductsRepositoryProtocol } from "./protocols";
import { Product } from "src/domain/entities/product";
import { CreateProductDTO } from "src/domain/DTO/create-product-DTO";
import { UpdateProductDTO } from "src/domain/DTO/update-product-DTO";

@Injectable()
export class ProductsRepository implements ProductsRepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async update(
    id: string,
    { name, price, qty, categoryIds, photo }: UpdateProductDTO
  ): Promise<void> {
    try {
      await this.prisma.product.update({
        where: { id },
        data: {
          name: name,
          price: price,
          qty: qty,
          photo: photo,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(
        "Erro ao atualizar o produto, tente novamente!"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(
        "Erro ao deletar o produto, tente novamente!"
      );
    }
  }

  async find(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: { categories: true },
      });
      return product;
    } catch (error) {
      throw new BadRequestException(
        "Erro ao encontrar as informações, tente novamente!"
      );
    }
  }

  async create({
    name,
    categoryIds,
    photo,
    price,
    qty,
  }: CreateProductDTO): Promise<Product> {
    try {
      const products = await this.prisma.product.create({
        data: {
          name,
          photo,
          price,
          qty,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
        include: { categories: true },
      });
      return products;
    } catch (error) {
      throw new BadRequestException(
        "Erro ao criar o produto, tente novamente!"
      );
    }
  }

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
