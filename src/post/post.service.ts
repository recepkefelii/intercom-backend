import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    createPost(user: IUserInfo, data: PostDto) {
        const userData = this.prismaService.post.create({
            data: {
                content: data.content,
                title: data.title,
                authorId: user.id,
            },
        });
        return userData;
    }

    async updatePost(id: number, data: PostDto, user: IUserInfo) {
        const userPosts = await this.prismaService.post.findFirst({
            where: {
                id: id,
            },
            select: {
                author: true,
                title: true,
                content: true,
            },
        });

        if (userPosts.author.id !== user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }else{
            const updatedPost = await this.prismaService.post.update({
                where: {
                    id: id,
                },
                select: {
                    author: true,
                    title: true,
                    content: true,
                },
                data: {
                    title: data.title,
                    content: data.content,
                },
            });
            return updatedPost;
        
        }
    }

    async deletePost(id: number, user: IUserInfo) {
        const getPost = await this.prismaService.post.findFirst({
            where: {
                id: id,
            },
            select: {
                author: true,
                title: true,
                content: true,
            },
        });
        if (getPost.author.id !== user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }else{
            const deletedPost = this.prismaService.post.delete({
                where: {
                    id: id
                }
            })
            return deletedPost;
        }
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
                },
            },
        });
        return allPosts;
    }

    getUserPosts(username: string) {
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
        if (!userPosts) {
            return { error: 'User not found' };
        }
        return userPosts;
    }
}
