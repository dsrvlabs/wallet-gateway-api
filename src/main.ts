import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 Validation Pipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러
      transform: true, // 자동 타입 변환
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 글로벌 Exception Filter 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  // 글로벌 Response Interceptor 설정 (성공 응답 통일)
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Wallet Gateway API')
    .setDescription('Wallet Gateway API Server')
    .setVersion('1.0')
    .addTag('wallet', '주소 생성 요청 관련 API')
    .addTag('withdrawal', '출금 요청 관련 API')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-request-id',
        in: 'header',
        description: 'Idempotency & Trace를 위한 UUID 형식의 요청 ID',
      },
      'x-request-id',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Content-Type: application/json 보장
  app.setGlobalPrefix('');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
