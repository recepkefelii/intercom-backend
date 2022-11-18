import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';
export declare class PostService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createPost(user: IUserInfo, data: PostDto): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post, never>;
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
}
