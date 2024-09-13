import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
})
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly commentService: CommentService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token;

    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const decoded = this.jwtService.verify(token as string);
      const user = await this.userService.findUserById(decoded.userId);
      client.data.user = user;
    } catch (e) {
      console.error('Token verification failed:', e.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(
    @MessageBody() createCommentDto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data.user) {
      client.emit('error', 'Unauthenticated');
      return;
    }

    const user = client.data.user as User;
    const newComment = await this.commentService.createComment(
      createCommentDto,
      user,
    );
    this.server.emit('commentCreated', newComment);
  }
}
