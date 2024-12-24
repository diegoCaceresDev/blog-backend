import { User } from './user.interface'; // Asegúrate de importar tu interfaz de usuario

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define aquí tu tipo de usuario
    }
  }
}
