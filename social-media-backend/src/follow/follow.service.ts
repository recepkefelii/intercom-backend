import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserInfo } from './interface/index';

@Injectable()
export class FollowService {
    
    constructor(private readonly prismaService: PrismaService) {}

    async follow(user:IUserInfo, id:number): Promise<any> {

        // get the user following the other user
        const userFollowing = await this.prismaService.user.findFirst({
            where: { id: user.id },
            include: {
                following: {
                    select: {
                        followerId: true,
                    },
                },
            },
        });

        

        const follow = await this.prismaService.follows.create({
            data: {
                followerId: user.id,
                followingId: id,
                },
                });
        return follow;
    }

    checkFollow(user:IUserInfo): Observable<any> {
        return from(this.prismaService.user.findFirst({
            where: { id: user.id },
            include: {
                followers: {
                    select: {
                        followerId: true,
                    },
                },
            },
        })).pipe(
            map((user) => {
                return user.followers.map((follow) => follow.followerId);
            }),
        );
    }

}
