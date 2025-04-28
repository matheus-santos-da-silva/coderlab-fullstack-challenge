import { Test, TestingModule } from "@nestjs/testing";
import { DeleteProductUseCase } from "../../src/application/use-cases";
import { InMemoryProductsRepository } from "../in-memory-repositories/in-memory-products-repository";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CreateProductInputMock } from "../mocks/create-product-input-mock";

describe("Delete Product UseCase", () => {
  let useCase: DeleteProductUseCase;
  let productsRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        {
          provide: ProductsRepositoryProtocol,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    productsRepository = module.get<ProductsRepositoryProtocol>(
      ProductsRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  it("should delete a Product", async () => {
    productsRepository.create(CreateProductInputMock);
    await useCase.delete("test-id");

    const products = await productsRepository.findMany();
    expect(products).toEqual([]);
  });

  it("should throw an exception when try delete product that id not exists", () => {
    const result = useCase.delete("test-id");
    expect(result).rejects.toThrow("Produto não existe!");
  });
});
