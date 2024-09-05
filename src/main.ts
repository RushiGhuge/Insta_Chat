import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );
  // Enable CORS with default options
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your frontend URL
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
