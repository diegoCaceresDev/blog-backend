import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostReaction } from 'src/postreaction/postreaction.entity';
export declare class UserService {
    private userRepository;
    private readonly reactionRepository;
    constructor(userRepository: Repository<User>, reactionRepository: Repository<PostReaction>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    validateUser(email: string, password: string): Promise<User | null>;
}
