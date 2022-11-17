import { Injectable } from '@nestjs/common';
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService:PrismaService ) {}

    // create user new post 
    createPost(user: IUserInfo,data:PostDto) {
        const userData = this.prismaService.post.create({
            data: {
                content: data.content,
                title: data.title,
                authorId: user.id,
            },
        });
        // return new post data
        return userData;
    }
}
