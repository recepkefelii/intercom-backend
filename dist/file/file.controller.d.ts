/// <reference types="multer" />
import { FileService } from './file.service';
import { IUserInfo } from '../common/interface/index';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File, user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never> | {
        Error: string;
    };
}
