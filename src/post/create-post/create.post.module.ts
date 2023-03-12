import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "../schemas/post.schema";
import { CreatePostController } from "./create.post.controller";
import { CreatePostService } from "./create.post.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    providers: [CreatePostService, JwtService],
    controllers: [CreatePostController]
})
export class CreatePostModule { }