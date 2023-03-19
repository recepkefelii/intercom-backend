import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserdDto } from "src/users/dto/user.dto";
import { Post, PostDocument } from "../post/schemas/post.schema";
import { Like, LikeDocument } from "./schemas/like.schema";

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) { }

  async likePost(postId: string, user: UserdDto): Promise<Post> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const existingLike = await this.likeModel.findOne({ post: postId, user: user.id });
    if (existingLike) {
      throw new HttpException(`User with id ${user.name} has already liked the post with id ${postId}`, HttpStatus.CONFLICT,
        {
          cause: new Error('you already like'),
        }
      );
    }

    const newLike = new this.likeModel({ post: postId, user: user.id });
    await newLike.save();
    post.likes++;
    post.isLiked = true
    await post.save();

    return post;
  }

  async unlikePost(userId: string, postId: string): Promise<Post> {
    const like = await this.likeModel.findOne({ user: userId, post: postId });
    if (!like) {
      throw new HttpException(`post not liked`, HttpStatus.BAD_REQUEST,
        {
          cause: new Error(),
        }
      );
    }

    await like.deleteOne();

    const post = await this.postModel.findById(postId);
    post.likes -= 1;
    post.isLiked = false
    await post.save();

    return post;
  }
}
