"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const posts_entity_1 = require("./posts.entity");
const posts_service_1 = require("./posts.service");
const posts_controller_1 = require("./posts.controller");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const user_module_1 = require("../user/user.module");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const config_1 = require("@nestjs/config");
const postreaction_entity_1 = require("../postreaction/postreaction.entity");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([posts_entity_1.Post, user_entity_1.User, postreaction_entity_1.PostReaction]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_KEY'),
                    signOptions: { expiresIn: '15m' },
                }),
            }),
            user_module_1.UserModule,
        ],
        providers: [posts_service_1.PostService, jwt_auth_guard_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        controllers: [posts_controller_1.PostController],
        exports: [typeorm_1.TypeOrmModule],
    })
], PostsModule);
//# sourceMappingURL=posts.module.js.map