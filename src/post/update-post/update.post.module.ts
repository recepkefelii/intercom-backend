import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "../schemas/post.schema";
import { UpdatePostController } from "./update.post.controller";
import { UpdatePostService } from "./update.post.service";



@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [UpdatePostController],
    providers: [JwtService, UpdatePostService]
})
export class UpdatePostModule {

}