import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { Model } from "mongoose";
import { UserdDto } from "src/users/dto/user.dto";
import { CreatePostDto } from "./dto/create.post.dto";
import { AwsS3Service } from "src/aws-s3/aws-s3.service";

@Injectable()
export class CreatePostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private readonly awsS3Service: AwsS3Service
    ) { }

    async createPost(file: Express.Multer.File, post: CreatePostDto, author: UserdDto): Promise<Post> {
        let photo_url = null
        if (file) {
            const uploadedFile = await this.awsS3Service.uploadFile(file.buffer, file.originalname);
            photo_url = uploadedFile.url;
        }
    
        const createPost = await this.postModel.create({
            content: post.content,
            title: post.title,
            author: author,
            photo_url: photo_url
        });
        return createPost;
    }
    
}
