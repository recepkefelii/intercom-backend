import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserdDto } from 'src/users/dto/user.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    @Get('all')
    async getAllPost() {
        return this.postService.getAllPost()
    }

    @Get(":id")
    async getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id)
    }

    @Get()
    @UseGuards(AuthGuard)
    async deneme(@CurrentUser() user:UserdDto){
        return this.postService.getWithAuthPost(user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deletePost(
      @Param('id') id: number,
      @CurrentUser() user: UserdDto,
    ) {
      return this.postService.deletePost(id, user.id);
    }
}
