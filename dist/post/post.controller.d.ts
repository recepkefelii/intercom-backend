import { IUserInfo } from 'src/common/interface';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(data: PostDto, user: IUserInfo): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never>;
    updatePost(id: number, data: PostDto, user: IUserInfo): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never>;
}
