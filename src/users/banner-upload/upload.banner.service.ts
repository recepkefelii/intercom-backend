import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { UserdDto } from "../dto/user.dto";
import { AwsS3Service } from "src/aws-s3/aws-s3.service";

@Injectable()
export class UploadBannerService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly awsS3Service: AwsS3Service
    ) { }

    async uploadBanner(file: Express.Multer.File, user: UserdDto) {
        const userProfile = await this.userModel.findById(user.id).select("-password");
        const uploadedFile = await this.awsS3Service.uploadFile(file.buffer, file.originalname);
        userProfile.banner_url = uploadedFile.url
        return await userProfile.save();
    }
}
