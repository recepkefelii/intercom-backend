import {
    Controller,
    Param,
    Post,
    UseGuards,
    Request,
    Get,
    Body,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard, GetUser } from 'src/common/index';
import { IUserInfo } from '../common/interface/index';

@UseGuards(AuthGuard)
@Controller('')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Get('follow/:id')
    @UseGuards(AuthGuard)
    followRequest(@Param('id') id: number, @GetUser() user: IUserInfo) {     
          
        return this.followService.followUser(user, id);
    }

    @Get('followers')
    @UseGuards(AuthGuard)
    userFollowers(@GetUser() user: IUserInfo) {
        return this.followService.followers(user);
    }

    @Get('following')
    @UseGuards(AuthGuard)
    userFollowing(@GetUser() user: IUserInfo) {
        return this.followService.following(user);
    }

    @Get('unfollow/:id')
    @UseGuards(AuthGuard)
    unfollowUser(@Param('id') id: number, @GetUser() user: IUserInfo) {
        return this.followService.unfollowUser(user, id);
    }
}
