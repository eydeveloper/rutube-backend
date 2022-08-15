import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { VideoEntity } from './video.entity';

export class CommentEntity extends BaseEntity {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, video => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
