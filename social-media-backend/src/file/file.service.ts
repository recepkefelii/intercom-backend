import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { IUserInfo } from 'src/common/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Injectable()
export class FileService {
    constructor(private readonly prismaService:PrismaService) {}

    saveFile(file: Express.Multer.File, user: IUserInfo) {
        const uuid = uuidv4();
        const writeStream = createWriteStream(
            `dist/images/${uuid.toString()}-${file.originalname}`,
        );
        writeStream.write(file.buffer);
        
        if(file.size > 0) {
            
             const userPhotoUpdate = this.prismaService.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ProfilPhotoPath: `http://localhost:8000/images/${uuid.toString()}-${file.originalname}`,
                },
            });
            return userPhotoUpdate;
        }
        return  {Error: 'file not uploaded'};
             }
        }
        
        
    

