import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from './config/typeorm.config';
import { CommentsModule } from './shared/comments/comments.module';
import { MediaModule } from './shared/media/media.module';
import { UsersModule } from './shared/users/users.module';
import { VideosModule } from './shared/videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),
    AuthModule,
    CommentsModule,
    UsersModule,
    VideosModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
