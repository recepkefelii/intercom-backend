import { IUserInfo } from 'src/common/interface';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(data: PostDto, user: IUserInfo): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never>;
    updatePost(id: number, data: PostDto, user: IUserInfo): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never> | {
        error: string;
    };
    deletePost(id: number, user: IUserInfo): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never> | {
        error: string;
    };
    getAllPosts(): import(".prisma/client").PrismaPromise<{
        title: string;
        content: string;
        author: {
            id: number;
            username: string;
            ProfilPhotoPath: string;
            followers: import(".prisma/client").Follows[];
            following: import(".prisma/client").Follows[];
        };
        id: number;
    }[]>;
    getUserPosts(id: number): any;
}
