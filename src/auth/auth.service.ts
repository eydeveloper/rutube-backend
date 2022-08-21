import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UsersService } from '../shared/users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUserFields(user),
      accessToken: await this.issueAccessToken(user.id)
    };
  }

  async register(dto: AuthDto) {
    await this.usersService.checkAvailableEmail(dto.email);

    const salt = await genSalt(10);
    const user = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt)
    });

    await this.userRepository.save(user);

    return {
      user: this.returnUserFields(user),
      accessToken: await this.issueAccessToken(user.id)
    };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email
      },
      select: ['id', 'email', 'password']
    });

    if (!user) {
      throw new NotFoundException('Аккаунт не найден');
    }

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return user;
  }

  async issueAccessToken(userId: number) {
    return await this.jwtService.signAsync(
      { id: userId },
      { expiresIn: '30d' }
    );
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email
    };
  }
}
