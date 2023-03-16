import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/schema/user.schema";
import { UploadBannerController } from "./upload.banner.controller";
import { UploadBannerService } from "./upload.banner.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UploadBannerController],
    providers: [JwtService, UploadBannerService],
    exports : [UploadBannerService]

})
export class UploadBannerModule { }