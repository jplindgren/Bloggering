import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Makes use of class-validate to sanitize data entering the API

  // Creates Swagger documentation and OpenAPI console on the root path (http://localhost:3000)
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Blog Post using NestJs')
    .setDescription('The bloggering API description')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(3000);
}
bootstrap();
