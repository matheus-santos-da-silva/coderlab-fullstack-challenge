import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PrismaService } from "src/infra/database/config/prisma.service";

describe("Get Products Controller (e2e) - (Get /product)", () => {
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

  it("should return 200 status code when get all products", async () => {
    await request(app.getHttpServer()).get("/product").expect(200);
  });

    it("should return 400 status code when get product that id not exists", async () => {
      await request(app.getHttpServer()).get(`/product/invalid-id`).expect(400);
    });
});
