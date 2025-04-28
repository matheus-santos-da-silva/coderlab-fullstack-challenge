import { Test, TestingModule } from "@nestjs/testing";
import { GetProductsUseCase } from "../../src/application/use-cases";
import { InMemoryProductsRepository } from "../in-memory-repositories/in-memory-products-repository";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CreateProductInputMock } from "../mocks/create-product-input-mock";

describe("Get Products UseCase", () => {
  let useCase: GetProductsUseCase;
  let productsRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductsUseCase,
        {
          provide: ProductsRepositoryProtocol,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductsUseCase>(GetProductsUseCase);
    productsRepository = module.get<ProductsRepositoryProtocol>(
      ProductsRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  it("should return all Products", async () => {
    await productsRepository.create(CreateProductInputMock);
    await productsRepository.create(CreateProductInputMock);
    const products = await useCase.findMany();
    expect(products).toHaveLength(2);
  });

  it("should return a empty array", async () => {
    const products = await useCase.findMany();
    expect(products).toEqual([]);
  });
});
