import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura CORS dinámico basado en el origen de la solicitud
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:4200', 'https://blog.diegocaceres.online'];
      
      // Si el origen está en la lista de permitidos, lo acepta
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Configuración para servir archivos estáticos desde la carpeta 'public'
  app.useStaticAssets(join(__dirname, '../../', 'public'));
  console.log(join(__dirname, '../../', 'public'));

  await app.listen(3000);
}
bootstrap();
