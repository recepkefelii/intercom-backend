import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/post/schemas/post.schema";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { Like, LikeSchema } from "./schemas/like.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }, { name: Post.name, schema: PostSchema }])],
    controllers: [LikeController],
    providers: [JwtService, LikeService]
})
export class LikeModule { }