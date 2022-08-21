import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../../entity/comment.entity';
import { VideoEntity } from '../../entity/video.entity';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [TypeOrmModule.forFeature([VideoEntity, CommentEntity])]
})
export class VideosModule {}
