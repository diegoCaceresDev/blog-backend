import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Bloquea propiedades no definidas
      transform: true, // Transforma tipos automáticamente
      disableErrorMessages: false, // Muestra mensajes de error detallados
    }),
  );
  // Configura CORS dinámico basado en el origen de la solicitud
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3001',
      'https://blog.diegocaceres.online',
    ], // Agrega ambos dominios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Using absolute path instead of relative path
  const imagesPath = join(process.cwd(), 'public/images');
  console.log('Serving images from:', imagesPath);
  app.useStaticAssets(imagesPath);

  await app.listen(3000);
}
bootstrap();
