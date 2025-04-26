import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const uploadsPath = join(process.cwd(), "uploads");

  app.useStaticAssets(uploadsPath, {
    prefix: "/uploads/",
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
