import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { AwsS3Module } from "src/aws-s3/aws-s3.module";
import { UploadBannerController } from "./upload.banner.controller";
import { UploadBannerService } from "./upload.banner.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AwsS3Module
    ],
    controllers: [UploadBannerController],
    providers: [JwtService, UploadBannerService],
    exports: [UploadBannerService]

})
export class UploadBannerModule { }