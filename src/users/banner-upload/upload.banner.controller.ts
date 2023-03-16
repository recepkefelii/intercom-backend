import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "../dto/user.dto";
import { UploadBannerService } from "./upload.banner.service";

@UseGuards(AuthGuard)
@Controller('upload')
export class UploadBannerController {
    constructor(private readonly uploadBannerService: UploadBannerService) { }
    @Post('/profile-banner')
@UseInterceptors(
  FileInterceptor('file', {
    limits: { fileSize: 1024 * 1024 }, // 1 MB
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, callback) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'),false);
      }
      callback(null, true);
    },
  }),
)
async uploadProfilPhoto(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: UserdDto) {
  return this.uploadBannerService.uploadBanner(file, user)
}
}