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
    follow(@Param('id') id: number, @GetUser() user:IUserInfo) {// user information from the token
        return from(this.followService.follow(user));
    }
}
