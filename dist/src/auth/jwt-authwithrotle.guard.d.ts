import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
export declare class JwtAuthGuardWithRole extends JwtAuthGuard {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
