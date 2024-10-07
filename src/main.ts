import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura CORS dinámico basado en el origen de la solicitud
  app.enableCors({
    origin: ['http://localhost:4200', 'https://blog.diegocaceres.online'], // Agrega ambos dominios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '../../', 'public/images'));
  console.log(join(__dirname, '../../', 'public'));

  await app.listen(3000);
}
bootstrap();
