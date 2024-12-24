import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user; // Esto depende de cómo implementaste la autenticación
    const allowedRoles = ['admin', 'superuser'];

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    req.user.isSuperuser = user.role === 'superuser'; // Añade un flag al objeto `user`

    if (!allowedRoles.includes(user.role)) {
      throw new UnauthorizedException('Acceso denegado');
    }

    next(); // Continúa con la ejecución
  }
}
