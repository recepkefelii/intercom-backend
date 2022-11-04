import { FollowStatus } from '../type/index';
import { UserFolllowDto } from '../dto/index';

export interface FriendRequest {
    id?: number;
    creator?: UserFolllowDto;
    receiver?: UserFolllowDto;
    status?: FollowStatus;
  }
  