import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/comment/schemas/comment.schema';
import { Like, LikeDocument } from 'src/like/schemas/like.schema';
import { UserdDto } from 'src/users/dto/user.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) { }

    async getAllPost(): Promise<Post[]> {
        try {
            const posts = await this.postModel.find().populate({
                path: "author",
                select: "name email profil_photo_url _id username"
              }).populate("comments");
              
            for (const post of posts) {
                post.isLiked = false;
            }

            return posts;
        } catch (error) {
            throw new BadRequestException("Cannot list posts");
        }
    }
    

    async getPostById(id: string): Promise<Post> {
        try {
            return await this.postModel.findById(id)
        } catch (error) {
            throw new HttpException(`a post with this ${id} was not found`, HttpStatus.NOT_FOUND,)
        }
    }

    async getPosts(user: UserdDto): Promise<Post[]> {
        const posts = await this.postModel.find().populate("comments");

        const likedPosts = await this.likeModel.find({ user: user.id }).exec();
        
        return posts.map((post) => {
            const isLiked = likedPosts.some(
                (like) => like.post.toString() === post._id.toString(),
            );

            return {
                ...post.toObject(),
                isLiked,
            };
        });
    }
    async deletePost(postId: number, userId: string): Promise<void> {
        const post = await this.postModel.findOne({ id: postId, user: userId }).exec();

        if (!post) {
            throw new NotFoundException('Could not find post.');
        }

        try {
            await this.postModel.deleteOne({ id: postId }).exec();
            await this.commentModel.deleteMany({ post: postId }).exec();
            await this.likeModel.deleteMany({ post: postId }).exec();
        } catch (error) {
            throw new HttpException('Could not delete post.', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
