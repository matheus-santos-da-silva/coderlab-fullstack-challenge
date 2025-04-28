import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PrismaService } from "src/infra/database/config/prisma.service";
import { CreateProductInputMock } from "./mocks/create-product-input-mock";
import * as path from "path";
import * as fs from "fs";

describe("Create Product Controller (e2e) - (POST /product)", () => {
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

  it("should return 201 status code when create a product", async () => {
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
  });

  it("should return 400 status code when try create a product without image", async () => {
    await request(app.getHttpServer())
      .post("/product")
      .set("Content-Type", "multipart/form-data")
      .field("name", CreateProductInputMock.name)
      .field("price", CreateProductInputMock.price)
      .field("qty", CreateProductInputMock.qty)
      .field("categoryIds", CreateProductInputMock.categoryIds.join(","))
      .expect(400);
  });
});
