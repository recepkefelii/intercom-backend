import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { extname } from "path";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { UserdDto } from "../dto/user.dto";

@Injectable()
export class PhotoUploadService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async uploadProfilPhoto(file: Express.Multer.File, user: UserdDto) {
        const userProfile = await this.userModel.findByIdAndUpdate(user.id).select("-password")
        console.log(userProfile);

        const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        userProfile.profil_photo_url = filename

        return await userProfile.save()
    }
}