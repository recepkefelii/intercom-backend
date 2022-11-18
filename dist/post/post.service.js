"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostService = class PostService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createPost(user, data) {
        const userData = this.prismaService.post.create({
            data: {
                content: data.content,
                title: data.title,
                authorId: user.id,
            },
        });
        return userData;
    }
    updatePost(id, data, user) {
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
    deletePost(id, user) {
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
                        followers: true,
                        following: true,
                    },
                }
            },
        });
        return allPosts;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map