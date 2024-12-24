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
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
let CommentGateway = class CommentGateway {
    commentService;
    jwtService;
    userService;
    server;
    constructor(commentService, jwtService, userService) {
        this.commentService = commentService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async handleConnection(client) {
        const token = client.handshake.query.token;
        if (!token) {
            console.log(`Client disconnected due to missing token: ${client.id}`);
            client.disconnect();
            return;
        }
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userService.findUserById(decoded.userId);
            if (!user) {
                console.log(`Client disconnected due to invalid user: ${client.id}`);
                client.disconnect();
                return;
            }
            client.data.user = user;
            console.log(`Client connected: ${client.id}`);
        }
        catch (e) {
            console.error('Token verification failed:', e.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleCreateComment(createCommentDto, client) {
        if (!client.data.user) {
            client.emit('error', 'No estás autenticado.');
            return;
        }
        try {
            const user = client.data.user;
            const newComment = await this.commentService.createComment(createCommentDto, user);
            this.server.emit('commentCreated', newComment);
        }
        catch (error) {
            console.error('Error creando el comentario:', error.message);
            client.emit('error', `Error al crear el comentario: ${error.message}`);
        }
    }
};
exports.CommentGateway = CommentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createComment'),
    __param(0, (0, websockets_1.MessageBody)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleCreateComment", null);
exports.CommentGateway = CommentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
        },
    }),
    __metadata("design:paramtypes", [comments_service_1.CommentService,
        jwt_1.JwtService,
        user_service_1.UserService])
], CommentGateway);
//# sourceMappingURL=comments.gateway.js.map