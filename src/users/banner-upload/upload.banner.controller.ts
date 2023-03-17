import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "../dto/user.dto";
import { UploadBannerService } from "./upload.banner.service";

@UseGuards(AuthGuard)
@Controller('upload')
export class UploadBannerController {
    constructor(private readonly uploadBannerService: UploadBannerService) { }
    @Post('/profile-banner')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilPhoto(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: UserdDto) {
        return this.uploadBannerService.uploadBanner(file, user)
    }
}