import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../../entity/comment.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  async create(userId: number, dto: CommentDto) {
    const comment = this.commentRepository.create({
      message: dto.message,
      user: { id: userId },
      video: { id: dto.videoId }
    });

    return await this.commentRepository.save(comment);
  }
}
