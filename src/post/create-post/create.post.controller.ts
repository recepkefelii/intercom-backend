import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "src/users/dto/user.dto";
import { CreatePostService } from "./create.post.service";
import { CreatePostDto } from "./dto/create.post.dto";

@UseGuards(AuthGuard)
@Controller('post')
export class CreatePostController {
    constructor(private readonly createPostService: CreatePostService) { }
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createPost(
        @Body() post: CreatePostDto,
        @CurrentUser() author: UserdDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.createPostService.createPost(file, post, author)
    }
}
