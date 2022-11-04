import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FollowStatus } from 'src/follow/type/index';

import { User } from './user.entity';

@Entity('request')
export class FallowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (userEntity) => userEntity.sentFriendRequests)
  creator: User;

  @ManyToOne(
    () => User,
    (userEntity) => userEntity.receivedFriendRequests,
  )
  receiver: User;

  @Column()
  status: FollowStatus;
}