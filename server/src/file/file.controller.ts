import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { FileService } from './file.service';
import { IUserInfo } from '../common/interface/index';
import { AuthGuard, GetUser } from 'src/common/';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
    constructor(private readonly fileService:FileService )  {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @GetUser() user: IUserInfo) {
        return this.fileService.saveFile(file,user);
}
}