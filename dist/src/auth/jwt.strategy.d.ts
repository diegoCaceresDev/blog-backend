import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<import("../user/user.entity").User>;
}
export {};
