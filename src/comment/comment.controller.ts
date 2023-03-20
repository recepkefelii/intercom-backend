import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "src/users/dto/user.dto";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    @Post()
    async commentPost(@Body() body: CommentDto, @CurrentUser() user: UserdDto) {      
        return this.commentService.createComment(body, user)
    }
}