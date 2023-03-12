import { Module } from "@nestjs/common";
import { CreatePostModule } from "./create-post/create.post.module";
import { UpdatePostController } from "./update-post/update.post.controller";
import { UpdatePostModule } from "./update-post/update.post.module";
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CreatePostModule, UpdatePostModule],
    providers: [PostService],
    controllers: [PostController]
})
export class PostModule { } 