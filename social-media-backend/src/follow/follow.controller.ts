import { Controller, Param, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard, GetUser } from 'src/common/index';
import { from, Observable, of } from 'rxjs';
import { FollowRequest } from './interface/follow.interface';
import { UserFolllowDto } from './dto';

@Controller('deneme')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

       

}
