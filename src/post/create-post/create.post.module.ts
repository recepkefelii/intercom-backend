import { Module } from "@nestjs/common";
import { CreatePostController } from "./create.post.controller";
import { CreatePostService } from "./create.post.service";

@Module({
    providers: [CreatePostService],
    controllers: [CreatePostController]
})
export class CreatePostModule { }