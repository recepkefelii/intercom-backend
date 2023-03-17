import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AwsS3Module } from "src/aws-s3/aws-s3.module";
import { Post, PostSchema } from "../schemas/post.schema";
import { CreatePostController } from "./create.post.controller";
import { CreatePostService } from "./create.post.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        AwsS3Module
    ],
    providers: [CreatePostService, JwtService],
    controllers: [CreatePostController]
})
export class CreatePostModule { }