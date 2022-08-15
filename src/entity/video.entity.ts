import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { JoinColumn } from 'typeorm/browser';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity('Video')
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: '', name: 'video_path' })
  videoPath: string;

  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath: string;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.video)
  comments: CommentEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
