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
import { ValidationPipe } from '@nestjs/common';

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

  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.query.token;

    if (!token) {
      console.log(`Client disconnected due to missing token: ${client.id}`);
      client.disconnect();
      return;
    }

    try {
      const decoded = this.jwtService.verify(token as string);
      const user = await this.userService.findUserById(decoded.userId);
      if (!user) {
        console.log(`Client disconnected due to invalid user: ${client.id}`);
        client.disconnect();
        return;
      }
      client.data.user = user;
      console.log(`Client connected: ${client.id}`);
    } catch (e) {
      console.error('Token verification failed:', e.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(
    @MessageBody(new ValidationPipe({ transform: true }))
    createCommentDto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (!client.data.user) {
      client.emit('error', 'No estás autenticado.');
      return;
    }

    try {
      const user = client.data.user as User;
      const newComment = await this.commentService.createComment(
        createCommentDto,
        user,
      );
      this.server.emit('commentCreated', newComment);
    } catch (error) {
      console.error('Error creando el comentario:', error.message);
      client.emit('error', `Error al crear el comentario: ${error.message}`);
    }
  }
}
