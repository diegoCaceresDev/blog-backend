import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PostReaction } from 'src/postreaction/postreaction.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PostReaction)
    private readonly reactionRepository: Repository<PostReaction>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Comprobar si el username ya existe
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new Error('Username already taken');
    }

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Creamos el usuario con el DTO
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guardamos el usuario en la base de datos
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
