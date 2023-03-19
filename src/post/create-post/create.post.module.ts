import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { AwsS3Module } from "src/aws-s3/aws-s3.module";
import { Post, PostSchema } from "../schemas/post.schema";
import { CreatePostController } from "./create.post.controller";
import { CreatePostService } from "./create.post.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, { name: User.name, schema: UserSchema }]),
        AwsS3Module
    ],
    providers: [CreatePostService, JwtService],
    controllers: [CreatePostController]
})
export class CreatePostModule { }