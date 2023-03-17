import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "../dto/user.dto";
import { PhotoUploadService } from "./photo.upload.service";

@UseGuards(AuthGuard)
@Controller('/upload')
export class PhotoUploadController {
    constructor(private readonly photoUplaodService: PhotoUploadService) { }

    @Post('/profil-photo')
    @UseInterceptors(FileInterceptor('file'))
    uploadProfilPhoto(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: UserdDto) {
        return this.photoUplaodService.uploadProfilPhoto(file, user)
    }
}