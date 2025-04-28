import { Test, TestingModule } from "@nestjs/testing";
import { CreateProductUseCase } from "../../src/application/use-cases";
import { InMemoryProductsRepository } from "../in-memory-repositories/in-memory-products-repository";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CreateProductInputMock } from "../mocks/create-product-input-mock";
import { ProductResponseMock } from "../mocks/product-response-mock";

describe("Create Product UseCase", () => {
  let useCase: CreateProductUseCase;
  let productsRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: ProductsRepositoryProtocol,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    productsRepository = module.get<ProductsRepositoryProtocol>(
      ProductsRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  it("should create a new Product", async () => {
    useCase.create(CreateProductInputMock);
    const product = await productsRepository.find("test-id");
    expect(product.id).toBe(ProductResponseMock.id);
    expect(product.name).toBe(ProductResponseMock.name);
  });

  it("should throw an exception when the product is not created", () => {
    jest.spyOn(productsRepository, "create").mockResolvedValue(null);
    const result = useCase.create(CreateProductInputMock);
    expect(result).rejects.toThrow(
      "Erro na criação do produto, tente novamente mais tarde!"
    );
  });
});
