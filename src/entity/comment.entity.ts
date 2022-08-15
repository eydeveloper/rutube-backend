import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { VideoEntity } from './video.entity';

export class CommentEntity {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, video => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;
}
