import { Controller, Param, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard, GetUser } from 'src/common/index';
import { from, Observable, of } from 'rxjs';
import { IUserInfo} from './interface/index';

@UseGuards(AuthGuard)
@Controller('')
export class FollowController {
    constructor(private readonly followService: FollowService) {}


    @Get('follow/:id') // create a post request parameter
    @UseGuards(AuthGuard)
    follow(@Param('id') id: number, @GetUser() user:IUserInfo) {
        return from(this.followService.follow(user,id));
    }

    @Post('followers')
    @UseGuards(AuthGuard)
    userFollowers(@Body() @GetUser() user:IUserInfo) {
        return this.followService.followers(user);
    }
}
