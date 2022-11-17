import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, GetUser } from 'src/common/index';
import { IUserInfo } from 'src/common/interface';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService) {}

    @Post('create')
    createPost(@Body() data:PostDto,@GetUser() user: IUserInfo) {
        return this.postService.createPost(user,data);
    }

    @Patch('update/:id')
    updatePost(@Param('id') id:number,@Body() data:PostDto,@GetUser() user: IUserInfo) {
        return this.postService.updatePost(id,data,user);
    }

    }
    

