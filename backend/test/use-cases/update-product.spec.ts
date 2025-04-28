import { Test, TestingModule } from "@nestjs/testing";
import { UpdateProductUseCase } from "../../src/application/use-cases";
import { InMemoryProductsRepository } from "../in-memory-repositories/in-memory-products-repository";
import { ProductsRepositoryProtocol } from "src/infra/database/repositories/protocols";
import { CreateProductInputMock } from "../mocks/create-product-input-mock";

describe("Update Product UseCase", () => {
  let useCase: UpdateProductUseCase;
  let productsRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        {
          provide: ProductsRepositoryProtocol,
          useClass: InMemoryProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateProductUseCase>(UpdateProductUseCase);
    productsRepository = module.get<ProductsRepositoryProtocol>(
      ProductsRepositoryProtocol
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  it("should update a Product", async () => {
    productsRepository.create(CreateProductInputMock);
    await useCase.update("test-id", {
      ...CreateProductInputMock,
      name: "test-update",
    });

    const product = await productsRepository.find("test-id");
    expect(product.name).toBe("test-update");
  });

  it("should throw an exception when try update with product id that not exists", () => {
    const result = useCase.update("test-id", CreateProductInputMock);
    expect(result).rejects.toThrow("Produto não existe!");
  });
});
