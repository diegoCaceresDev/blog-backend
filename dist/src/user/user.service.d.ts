import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSuperUserDto } from './dto/create-superuser.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    createSuperUser(createUserDto: CreateSuperUserDto): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
}
