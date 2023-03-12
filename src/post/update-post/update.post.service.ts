import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { PostUpdateDto } from './dto/update.post.dto';

@Injectable()
export class UpdatePostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) { }

  async updatePost(
    post: PostUpdateDto,
    userId: string,
  ): Promise<Post> {
    try {
      const createPost = await this.postModel.findById(post.id).exec();

      if (!post) {
        throw new Error('Post not found');
      }

      createPost.title = post.title;
      createPost.content = post.content;
      createPost.updatedDate = new Date();

      return createPost.save();
    }
    catch(error) {
      throw new UnauthorizedException('You are not authorized to edit this post');
  }
}}
