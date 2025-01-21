'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require('typeorm');
const user_entity_1 = require('./src/user/user.entity');
const posts_entity_1 = require('./src/posts/posts.entity');
const comment_entity_1 = require('./src/comments/comment.entity');
const postreaction_entity_1 = require('./src/posts/postreaction.entity'); // Agregar import de PostReaction

exports.AppDataSource = new typeorm_1.DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'diego1302',
  database: 'postgres',
  entities: [
    user_entity_1.User,
    posts_entity_1.Post,
    comment_entity_1.Comment,
    postreaction_entity_1.PostReaction,
  ], // Agregar PostReaction aquí
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
