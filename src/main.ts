import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validation - pipe로 동작. 모든 곳에서 사용하기 위해 전역으로 등록해주어야 한다.
  app.useGlobalPipes(new ValidationPipe());
  // 전역 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger 설정 방법
  const config = new DocumentBuilder()
    .setTitle('my custom swagger')
    .setDescription('cat project')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
