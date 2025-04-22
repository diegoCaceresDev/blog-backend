"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostReactionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const postreaction_entity_1 = require("./postreaction.entity");
const user_entity_1 = require("../user/user.entity");
const postreaction_service_1 = require("./postreaction.service");
const postreaction_controller_1 = require("./postreaction.controller");
const posts_module_1 = require("../posts/posts.module");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const config_1 = require("@nestjs/config");
const posts_entity_1 = require("../posts/posts.entity");
let PostReactionModule = class PostReactionModule {
};
exports.PostReactionModule = PostReactionModule;
exports.PostReactionModule = PostReactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([postreaction_entity_1.PostReaction, user_entity_1.User, posts_entity_1.Post]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_KEY'),
                    signOptions: { expiresIn: '15m' },
                }),
            }),
            user_module_1.UserModule,
            posts_module_1.PostsModule,
        ],
        providers: [postreaction_service_1.PostReactionService],
        controllers: [postreaction_controller_1.PostReactionController],
    })
], PostReactionModule);
//# sourceMappingURL=postreaction.module.js.map