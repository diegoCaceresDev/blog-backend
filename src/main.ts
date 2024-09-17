import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración para servir archivos estáticos desde la carpeta 'public'
  app.useStaticAssets(join(__dirname, '../../', 'public'));
  console.log(join(__dirname, '../../', 'public'));

  // Configura CORS para permitir tanto el dominio del frontend como otros dominios relevantes
  app.enableCors({
    origin: ['https://diegocaceres.online', 'https://api.diegocaceres.online'], // Permitir ambos dominios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
