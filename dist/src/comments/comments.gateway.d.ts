import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from '../user/user.service';
export declare class CommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly commentService;
    private readonly jwtService;
    private readonly userService;
    server: Server;
    constructor(commentService: CommentService, jwtService: JwtService, userService: UserService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleCreateComment(createCommentDto: CreateCommentDto, client: Socket): Promise<void>;
}
