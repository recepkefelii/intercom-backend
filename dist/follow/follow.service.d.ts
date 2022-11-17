import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserInfo } from '../common/interface/index';
export declare class FollowService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    followUser(user: IUserInfo, id: number): Observable<{
        message: string;
    }>;
    followers(user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    following(user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<{
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
