import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserInfo } from './interface/index';

@Injectable()
export class FollowService {
    constructor(private readonly prismaService: PrismaService) {}

    async follow(user: IUserInfo, id: number): Promise<any> {
        const follow = await this.prismaService.follows.create({
            data: {
                followerId: user.id,
                followingId: id,
            },
        });
        return follow;
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
}
