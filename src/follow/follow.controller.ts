import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserdDto } from 'src/users/dto/user.dto';
import { FollowService } from './follow.service';

@UseGuards(AuthGuard)
@Controller()
export class FollowController {
    constructor(private readonly followService: FollowService) { }

    @Get('follow/:id')
    async follow(@Param('id') id: string, @CurrentUser() user: UserdDto) {
        return await this.followService.follow(user.id, id)
    }

    @Get('unfollow/:id')
    async unFollow(@Param('id') id: string, @CurrentUser() user: UserdDto) {
        return await this.followService.unFollow(user.id, id)
    }

}
