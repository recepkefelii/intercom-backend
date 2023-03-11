import { Module } from "@nestjs/common";
import { CreatePostModule } from "./create-post/create.post.module";

@Module({
    imports: [CreatePostModule]
})
export class PostModule { } 