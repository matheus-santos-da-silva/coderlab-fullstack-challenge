import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { CreateProductInputMock } from "./mocks/create-product-input-mock";
import * as path from "path";
import * as fs from "fs";

describe("Update Product Controller (e2e) - (PATCH /product/:id)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await prismaService.product.deleteMany({});
  });

  it("should return 200 status code when update a product", async () => {
    const imagePath = path.join(__dirname, "files", "test-image.webp");

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Test image not found at ${imagePath}`);
    }

    await request(app.getHttpServer())
      .post("/product")
      .set("Content-Type", "multipart/form-data")
      .field("name", CreateProductInputMock.name)
      .field("price", CreateProductInputMock.price)
      .field("qty", CreateProductInputMock.qty)
      .field("categoryIds", CreateProductInputMock.categoryIds.join(","))
      .attach("photo", imagePath)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get("/product")
      .expect(200);

    const products = response.body;

    await request(app.getHttpServer())
      .patch(`/product/${products[0].id}`)
      .set("Content-Type", "multipart/form-data")
      .field("name", "Other Name")
      .field("price", CreateProductInputMock.price)
      .field("qty", CreateProductInputMock.qty)
      .field("categoryIds", CreateProductInputMock.categoryIds.join(","))
      .expect(200);
  });

  it("should return 400 status code when try update a product that id not exists", async () => {
    await request(app.getHttpServer())
      .patch(`/product/invalid-id`)
      .set("Content-Type", "multipart/form-data")
      .field("name", "Other Name")
      .field("price", CreateProductInputMock.price)
      .field("qty", CreateProductInputMock.qty)
      .field("categoryIds", CreateProductInputMock.categoryIds.join(","))
      .expect(400);
  });
});
