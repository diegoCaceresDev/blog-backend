"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    }));
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://localhost:3001',
            'https://blog.diegocaceres.online',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    const imagesPath = (0, path_1.join)(process.cwd(), 'public/images');
    console.log('Serving images from:', imagesPath);
    app.useStaticAssets(imagesPath);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map