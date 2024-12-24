import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthenticatedRequest } from 'src/common/request.interface';
import { CreateSuperUserDto } from './dto/create-superuser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        user: User;
    }>;
    getMe(req: AuthenticatedRequest): Promise<User>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createSuperuser(createUserDto: CreateSuperUserDto): Promise<User>;
}
