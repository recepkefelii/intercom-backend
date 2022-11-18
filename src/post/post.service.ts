import { Injectable } from '@nestjs/common';
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService:PrismaService ) {}

    createPost(user: IUserInfo,data:PostDto) {
        const userData = this.prismaService.post.create({
            data: {
                content: data.content,
                title: data.title,
                authorId: user.id,
            },
        });
        return userData;
    }

    updatePost(id:number,data:PostDto,user: IUserInfo) {
        const userPosts = this.prismaService.user.findFirst({
            where: {
                id: user.id,
            },
            select: {
                posts: {
                    where: {
                        id: id,
                    },
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        if (userPosts) {
            const updatedPost = this.prismaService.post.update({
                where: {
                    id: id,
                },
                data: {
                    title: data.title,
                    content: data.content,
                },
            });
            return updatedPost;
        }
        return { error: 'You have no post with this id' };
}
    deletePost(id:number,user: IUserInfo) {
        const userPosts = this.prismaService.user.findFirst({
            where: {
                id: user.id,
            },
            select: {
                posts: {
                    where: {
                        id: id,
                    },
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        if (userPosts) {
            const deletedPost = this.prismaService.post.delete({
                where: {
                    id: id,
                },
            });
            return deletedPost;
        }
        return { error: 'You have no post with this id' };
    }

    getAllPosts() {
        const allPosts = this.prismaService.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        ProfilPhotoPath: true,
                    },
                }
            },
        });
        return allPosts;
    }

    getUserPosts(username:string) {
        const userPosts = this.prismaService.user.findFirst({
            where: {
                username: username,
            },
            select: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                    },
                },
            },
        });
        if(!userPosts) {
            return { error: 'User not found' };
    }
        return userPosts;
    }
    
    
}
