import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { Post, PostSchema } from "src/post/schemas/post.schema";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Comment, CommentSchema } from "./schemas/comment.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema },
         { name: Post.name, schema: PostSchema },
        {name: User.name, schema: UserSchema}])],
    controllers: [CommentController],
    providers: [CommentService, JwtService]
})
export class CommentModule { }