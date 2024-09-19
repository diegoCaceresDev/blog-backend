import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura CORS antes de cualquier otra configuración
  app.enableCors({
    origin: ['http://localhost:4200', 'https://diegocaceres.online'], // Agrega ambos dominios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Configuración para servir archivos estáticos desde la carpeta 'public'
  app.useStaticAssets(join(__dirname, '../../', 'public'));
  console.log(join(__dirname, '../../', 'public'));

  await app.listen(3000);
}
bootstrap();
