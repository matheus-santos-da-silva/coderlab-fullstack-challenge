import { Test, TestingModule } from "@nestjs/testing";
import { GetProductUseCase } from "../../src/application/use-cases";
import { InMemoryProductsRepository } from "../in-memory-repositories/in-memory-products-repository";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CreateProductInputMock } from "../mocks/create-product-input-mock";
import { ProductResponseMock } from "../mocks/product-response-mock";

describe("Get Product UseCase", () => {
  let useCase: GetProductUseCase;
  let productsRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductUseCase,
        {
          provide: ProductsRepositoryProtocol,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductUseCase>(GetProductUseCase);
    productsRepository = module.get<ProductsRepositoryProtocol>(
      ProductsRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  it("should return a Product", async () => {
    await productsRepository.create(CreateProductInputMock);
    const product = await useCase.find("test-id");
    expect(product).toEqual(ProductResponseMock);
  });

  it("should throw an exception when the product id not exists", () => {
    const result = useCase.find("test-id");
    expect(result).rejects.toThrow("Produto não existe!");
  });
});
