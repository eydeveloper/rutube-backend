import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../../entity/subscription.entity';
import { UserEntity } from '../../entity/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>
  ) {}

  async getAll() {
    return this.userRepository.find();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      relations: {
        subscriptions: {
          toUser: true
        },
        videos: true
      },
      order: {
        createdAt: 'desc'
      }
    });

    if (!user) {
      throw new NotFoundException('Пользователь на найден');
    }

    return user;
  }

  async update(id: number, dto: UserDto) {
    const user = await this.getById(id);

    if (dto.email) {
      await this.checkAvailableEmail(dto.email, id);
    }

    if (dto.password) {
      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    user.username = dto.username;
    user.description = dto.description;
    user.avatarPath = dto.avatarPath;

    return this.userRepository.save(user);
  }

  async subscribe(fromUserId: number, toUserId: number) {
    const subscriptionFilter = {
      fromUser: { id: fromUserId },
      toUser: { id: toUserId }
    };

    const isSubscribed = await this.subscriptionRepository.findOneBy(
      subscriptionFilter
    );

    if (isSubscribed) {
      await this.subscriptionRepository.delete(subscriptionFilter);
      return false;
    }

    const subscription = await this.subscriptionRepository.create(
      subscriptionFilter
    );

    await this.subscriptionRepository.save(subscription);
    return true;
  }

  async checkAvailableEmail(email: string, id?: number) {
    const user = await this.userRepository.findOneBy({ email });

    if (user && id !== user.id) {
      throw new BadRequestException(
        'Пользователь с указанным адресом эл. почты уже зарегистрирован'
      );
    }
  }
}
