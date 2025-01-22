"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const posts_module_1 = require("./posts/posts.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./user/user.entity");
const chatgpt_module_1 = require("./chatgpt/chatgpt.module");
const comments_module_1 = require("./comments/comments.module");
const comment_entity_1 = require("./comments/comment.entity");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const postreaction_entity_1 = require("./postreaction/postreaction.entity");
const posts_entity_1 = require("./posts/posts.entity");
const postreaction_module_1 = require("./postreaction/postreaction.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [user_entity_1.User, posts_entity_1.Post, comment_entity_1.Comment, postreaction_entity_1.PostReaction],
                    migrations: ['dist/migrations/*.js'],
                    synchronize: false,
                }),
            }),
            posts_module_1.PostsModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            chatgpt_module_1.ChatgptModule,
            comments_module_1.CommentsModule,
            postreaction_module_1.PostReactionModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map