import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FollowStatus } from 'src/follow/type/index';

import { UserEntity } from './user.entity';

@Entity('request')
export class FallowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.sentFriendRequests)
  creator: UserEntity;

  @ManyToOne(
    () => UserEntity,
    (userEntity) => userEntity.receivedFriendRequests,
  )
  receiver: UserEntity;

  @Column()
  status: FollowStatus;
}