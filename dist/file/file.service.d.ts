/// <reference types="multer" />
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class FileService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    saveFile(file: Express.Multer.File, user: IUserInfo): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never> | {
        Error: string;
    };
}
