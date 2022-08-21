import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJwtConfig } from '../config/jwt.config';
import { SubscriptionEntity } from '../entity/subscription.entity';
import { UserEntity } from '../entity/user.entity';
import { UsersService } from '../shared/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    TypeOrmModule.forFeature([UserEntity, SubscriptionEntity])
  ]
})
export class AuthModule {}
