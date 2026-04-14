import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const allowedOrigins = [
  'http://localhost:5173',
  'http://46.225.229.161:5173',
  'https://dashboard.viajes4patas.com',
  'https://www.viajes4patas.com',
  'https://viajes4patas.com',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
