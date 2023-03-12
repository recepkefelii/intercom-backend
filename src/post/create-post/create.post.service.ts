import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { Model } from "mongoose";
import { UserdDto } from "src/users/dto/user.dto";
import { CreatePostDto } from "./dto/create.post.dto";

@Injectable()
export class CreatePostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

    async createPost(post: CreatePostDto, author: UserdDto): Promise<Post> {
        const createPost = await this.postModel.create({
            content: post.content,
            title: post.title,
            author: author
        })
        return createPost
    }
}
