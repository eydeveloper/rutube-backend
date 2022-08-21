import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
// import { videoDto } from '../../common/dto/video.dto';
import { VideoEntity } from '../../entity/video.entity';
import { VideoDto } from './video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) {}

  async getAll(searchTerm?: string) {
    const videoFilter: FindOptionsWhereProperty<VideoEntity> = searchTerm
      ? { title: ILike(`%${searchTerm}%`) }
      : {};

    return this.videoRepository.find({
      where: {
        ...videoFilter,
        isPublic: true
      },
      relations: {
        user: true,
        comments: {
          user: true
        }
      },
      select: {
        user: {
          id: true,
          username: true,
          isVerified: true,
          avatarPath: true
        }
      },
      order: {
        createdAt: 'desc'
      }
    });
  }

  async getMostPopular() {
    return this.videoRepository.find({
      where: {
        views: MoreThan(0)
      },
      relations: {
        user: true
      },
      select: {
        user: {
          id: true,
          username: true,
          isVerified: true,
          avatarPath: true
        }
      },
      order: {
        views: 'desc'
      }
    });
  }

  async getById(id: number, isPublic = true) {
    const video = await this.videoRepository.findOne({
      where: {
        id,
        isPublic
      },
      relations: {
        user: true,
        comments: {
          user: true
        }
      },
      select: {
        user: {
          id: true,
          username: true,
          isVerified: true,
          subscribersCount: true,
          avatarPath: true,
          subscriptions: true
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            username: true,
            isVerified: true,
            subscribersCount: true,
            avatarPath: true
          }
        }
      },
      order: {
        createdAt: 'desc'
      }
    });

    if (!video) {
      throw new NotFoundException('Видео не найдено');
    }

    return video;
  }

  async create(userId: number) {
    const video = await this.videoRepository.create({
      title: '',
      description: '',
      videoPath: '',
      thumbnailPath: '',
      user: { id: userId }
    });

    await this.videoRepository.save(video);

    return video.id;
  }

  async update(id: number, dto: VideoDto) {
    const video = await this.getById(id);

    console.log({
      ...dto
    });

    return this.videoRepository.save({
      ...video,
      ...dto
    });
  }

  async updateViews(id: number) {
    const video = await this.getById(id);

    video.views++;

    return await this.videoRepository.save(video);
  }

  async updateReaction(id: number) {
    const video = await this.getById(id);

    video.likes++;

    return await this.videoRepository.save(video);
  }

  async delete(id: number) {
    return this.videoRepository.delete({ id });
  }
}
