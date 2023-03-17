import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { AwsS3Service } from "src/aws-s3/aws-s3.service";
import { UserdDto } from "../dto/user.dto";

@Injectable()
export class PhotoUploadService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly awsS3Service: AwsS3Service
    ) { }

    async uploadProfilPhoto(file: Express.Multer.File, user: UserdDto) {
        const userProfile = await this.userModel.findByIdAndUpdate(user.id).select("-password")
        const uploadedFile = await this.awsS3Service.uploadFile(file.buffer, file.originalname);
        userProfile.profil_photo_url = uploadedFile.url
        return await userProfile.save();
    }
}