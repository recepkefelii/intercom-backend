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
                id: number;
                name: string;
                username: string;
                firstName: string;
                lastName: string;
                about: string;
                ProfilPhotoPath: string;
            };
        }[];
    }, never>;
    userFollowing(user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<{
        following: {
            follower: {
                id: number;
                name: string;
                username: string;
                firstName: string;
                lastName: string;
                about: string;
                ProfilPhotoPath: string;
            };
        }[];
    }, never>;
}
