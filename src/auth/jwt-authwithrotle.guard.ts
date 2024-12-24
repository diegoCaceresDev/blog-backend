import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuardWithRole extends JwtAuthGuard {
  handleRequest(err, user, info: any, context: ExecutionContext): any {
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }

    // Asegúrate de que el rol está presente en el usuario
    const request = context.switchToHttp().getRequest();
    request.user.role = user.role; // El role ahora está en el request.user

    return user;
  }
}
