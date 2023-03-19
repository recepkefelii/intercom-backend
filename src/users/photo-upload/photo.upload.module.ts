import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { AwsS3Module } from "src/aws-s3/aws-s3.module";
import { PhotoUploadController } from "./photo.upload.controller";
import { PhotoUploadService } from "./photo.upload.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AwsS3Module
    ],
    controllers: [PhotoUploadController],
    providers: [PhotoUploadService, JwtService],
    exports: [PhotoUploadService]
})
export class PhotoUploadModule {

}