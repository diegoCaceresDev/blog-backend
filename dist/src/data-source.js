"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user/user.entity");
const comment_entity_1 = require("./comments/comment.entity");
const posts_entity_1 = require("./posts/posts.entity");
const postreaction_entity_1 = require("./postreaction/postreaction.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'diego1302',
    database: 'postgres',
    entities: [postreaction_entity_1.PostReaction, user_entity_1.User, comment_entity_1.Comment, posts_entity_1.Post],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map