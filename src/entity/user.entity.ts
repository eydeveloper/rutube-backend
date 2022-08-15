import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { VideoEntity } from './video.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ default: 0, name: 'subscribers_count' })
  subscribersCount: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => VideoEntity, video => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.toUser)
  subscribers: SubscriptionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
