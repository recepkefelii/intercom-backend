import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { PhotoUploadController } from "./photo.upload.controller";
import { PhotoUploadService } from "./photo.upload.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MulterModule.register({ dest: './upload' }),
    ],
    controllers: [PhotoUploadController],
    providers: [PhotoUploadService, JwtService],
    exports: [PhotoUploadService]
})
export class PhotoUploadModule {

}