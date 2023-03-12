import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "src/users/dto/user.dto";
import { PostUpdateDto } from "./dto/update.post.dto";
import { UpdatePostService } from "./update.post.service";

@UseGuards(AuthGuard)
@Controller("post")
export class UpdatePostController {
  constructor(private readonly updatePostService: UpdatePostService) { }

  @Patch("update")
  async updatePost(
    @Body() post: PostUpdateDto,
    @CurrentUser() user: UserdDto
  ) {
    return this.updatePostService.updatePost(post, user.id);
  }
}
