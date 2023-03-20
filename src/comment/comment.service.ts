import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { PostService } from "src/post/post.service";
import { Post, PostDocument } from "src/post/schemas/post.schema";
import { UserdDto } from "src/users/dto/user.dto";
import { CommentDto } from "./dto/comment.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async createComment(commentDto: CommentDto, user: UserdDto) {
        const post = await this.postModel.findById(commentDto.id).exec();
        console.log(post.id);
        
        
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const currentUser = await this.userModel.findOne({id: user.id}).exec()

        if (!currentUser) {
            throw new NotFoundException('User not found');
        }

        const newComment = new this.commentModel({
            post: post.id,
            author: currentUser.id,
            content: commentDto.content,
        });

        const savedComment = await newComment.save();

        post.comments.push(savedComment.id);
        await post.save();

        return savedComment;
    }

}