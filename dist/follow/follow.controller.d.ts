import { FollowService } from './follow.service';
import { Observable } from 'rxjs';
import { IUserInfo } from '../common/interface/index';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    followRequest(id: number, user: IUserInfo): Observable<{
        message: string;
    }>;
    userFollowers(user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<{
        followers: {
            following: {
                username: string;
                firstName: string;
                lastName: string;
                name: string;
                about: string;
                ProfilPhotoPath: string;
                id: number;
            };
        }[];
    }, never>;
    userFollowing(user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<{
        following: {
            follower: {
                username: string;
                firstName: string;
                lastName: string;
                name: string;
                about: string;
                ProfilPhotoPath: string;
                id: number;
            };
        }[];
    }, never>;
}
