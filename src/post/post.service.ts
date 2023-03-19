import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserdDto } from 'src/users/dto/user.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

    async getAllPost(): Promise<Post[]> {
        try {
            return await this.postModel.find()
        } catch (error) {
            throw new BadRequestException("cannot list posts")
        }
    }

    async getPostById(id: string): Promise<Post> {
        try {
            return await this.postModel.findById(id)
        } catch (error) {
            throw new HttpException(`a post with this ${id} was not found`, HttpStatus.NOT_FOUND,)
        }
    }

}
