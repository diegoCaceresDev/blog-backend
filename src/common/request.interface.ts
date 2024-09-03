// src/common/interfaces/request.interface.ts

import { Request } from 'express';
import { JwtPayload } from '../auth/jwt-payload.interface'; // Ajusta la ruta si es necesario

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
