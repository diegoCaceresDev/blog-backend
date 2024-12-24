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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const posts_entity_1 = require("./posts.entity");
const user_entity_1 = require("../user/user.entity");
const postreaction_entity_1 = require("./postreaction.entity");
let PostService = class PostService {
    postRepository;
    userRepository;
    reactionRepository;
    constructor(postRepository, userRepository, reactionRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.reactionRepository = reactionRepository;
    }
    async createPost(createPostDto, user, imageUrl) {
        const userId = user.userId;
        if (!userId) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        const author = await this.userRepository.findOneBy({ id: userId });
        if (!author) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const dailyPosts = await this.countDailyPosts(userId);
        const MAX_POSTS_PER_DAY = 5;
        if (dailyPosts >= MAX_POSTS_PER_DAY) {
            throw new common_1.BadRequestException(`You have reached the daily limit of ${MAX_POSTS_PER_DAY} posts`);
        }
        const newPost = this.postRepository.create({
            ...createPostDto,
            author,
            imageUrl,
        });
        return this.postRepository.save(newPost);
    }
    async getAllPosts(userId, page = 1, limit = 10) {
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.reactions', 'reaction', 'reaction.userId = :userId', { userId })
            .orderBy('post.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return posts.map((post) => {
            const userReaction = post.reactions?.[0]?.type || null;
            return { ...post, userReaction };
        });
    }
    async getPostsByUserId(userId, page = 1, limit = 10) {
        const options = {
            where: { author: { id: userId } },
            relations: ['author'],
            skip: (page - 1) * limit,
            take: limit,
        };
        return this.postRepository.find(options);
    }
    async updatePost(postId, updatePostDto, userId) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['author'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.author.id !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to update this post');
        }
        Object.assign(post, updatePostDto);
        return this.postRepository.save(post);
    }
    async getPostById(postId) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['author'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async deletePostById(postId, userId, userRole) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['author'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Post no encontrado');
        }
        if (post.author.id !== userId && userRole !== 'superuser') {
            throw new common_1.UnauthorizedException('No tienes permiso para eliminar este post');
        }
        await this.postRepository.delete(postId);
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
    async countDailyPosts(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.postRepository.count({
            where: {
                author: { id: userId },
                createdAt: (0, typeorm_2.MoreThan)(today),
            },
        });
    }
    async countAllPosts() {
        return this.postRepository.count();
    }
    async countPostsByUserId(userId) {
        return this.postRepository.count({ where: { author: { id: userId } } });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(posts_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(postreaction_entity_1.PostReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=posts.service.js.map