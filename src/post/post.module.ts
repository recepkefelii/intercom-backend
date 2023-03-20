import { Module } from "@nestjs/common";
import { CreatePostModule } from "./create-post/create.post.module";
import { UpdatePostModule } from "./update-post/update.post.module";
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";
import { JwtService } from "@nestjs/jwt";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { Like, LikeSchema } from "src/like/schemas/like.schema";
import { Comment, CommentSchema } from "src/comment/schemas/comment.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema },
    { name: Like.name, schema: LikeSchema },
    { name: Comment.name, schema: CommentSchema }
    ]),
        CreatePostModule, UpdatePostModule],
    providers: [PostService, JwtService],
    controllers: [PostController]
})
export class PostModule { } 