import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "src/users/dto/user.dto";
import { LikeService } from "./like.service";

@UseGuards(AuthGuard)
@Controller()
export class LikeController {
    constructor(private readonly likeService: LikeService) { }
    @Get('like/:id')
    async likePost(@Param('id') id: string, @CurrentUser() user: UserdDto) {
        return await this.likeService.likePost(id, user)
    }

    @Get('unlike/:id')
    async unlikePost(@Param('id') id: string, @CurrentUser() user: UserdDto) {
        return await this.likeService.unlikePost(user.id, id)
    }
}