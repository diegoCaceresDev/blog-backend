"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostReactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postreaction_entity_1 = require("./postreaction.entity");
const posts_entity_1 = require("../posts/posts.entity");
const user_entity_1 = require("../user/user.entity");
let PostReactionService = class PostReactionService {
    reactionRepository;
    postRepository;
    userRepository;
    constructor(reactionRepository, postRepository, userRepository) {
        this.reactionRepository = reactionRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async addReactionToPost(postId, userId, createReactionDto) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${postId} not found`);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        let reaction = await this.reactionRepository.findOne({
            where: { user: { id: userId }, post: { id: postId } },
        });
        if (reaction) {
            if (reaction.type !== createReactionDto.type) {
                if (reaction.type === 'like') {
                    post.likeCount -= 1;
                }
                else if (reaction.type === 'dislike') {
                    post.dislikeCount -= 1;
                }
                reaction.type = createReactionDto.type;
                if (createReactionDto.type === 'like') {
                    post.likeCount += 1;
                }
                else if (createReactionDto.type === 'dislike') {
                    post.dislikeCount += 1;
                }
            }
            else {
                throw new common_1.BadRequestException('You have already reacted with this type');
            }
        }
        else {
            reaction = this.reactionRepository.create({
                type: createReactionDto.type,
                user,
                post,
            });
            if (createReactionDto.type === 'like') {
                post.likeCount += 1;
            }
            else if (createReactionDto.type === 'dislike') {
                post.dislikeCount += 1;
            }
        }
        await this.reactionRepository.save(reaction);
        await this.postRepository.save(post);
        return post;
    }
};
exports.PostReactionService = PostReactionService;
exports.PostReactionService = PostReactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postreaction_entity_1.PostReaction)),
    __param(1, (0, typeorm_1.InjectRepository)(posts_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostReactionService);
//# sourceMappingURL=postreaction.service.js.map