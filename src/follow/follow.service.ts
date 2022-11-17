import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserInfo } from '../common/interface/index';

@Injectable()
export class FollowService {
    constructor(private readonly prismaService: PrismaService) {}
    // create a follow request to follow a user 
    followUser(user: IUserInfo, id: number) {
        const userF = this.prismaService.follows.createMany({
            data: [
                {
                    followerId: id,
                    followingId: user.id,
                },
            ],
        });
        return from(userF).pipe(
            switchMap((data) => {
                return of({
                    message: 'follow request sent',
                });
            }
            ),
        );
    }
    
    


    followers(user: IUserInfo) {
        const userFollowInfo = this.prismaService.user.findFirstOrThrow({
            where: {
                id: user.id,
            },
            select: {
                followers: {
                    select: {
                        following: {
                            select: {
                                name: true,
                                id: true,
                                username: true,
                                ProfilPhotoPath: true,
                                about: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });

        return userFollowInfo;
    }

    following(user: IUserInfo) {
        const userFollowingInfo = this.prismaService.user.findFirstOrThrow({
            where: {
                id: user.id,
            },
            select: {
                following: {
                    select: {
                        follower: {
                            select: {
                                name: true,
                                id: true,
                                username: true,
                                ProfilPhotoPath: true,
                                about: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });

        return userFollowingInfo;
    }
}
