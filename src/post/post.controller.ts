import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    @Get('all')
    async getAllPost() {
        return this.postService.getAllPost()
    }

    @Get(":id")
    async getPostById(@Param('id') id: string){
        return this.postService.getPostById(id)
    }
}
