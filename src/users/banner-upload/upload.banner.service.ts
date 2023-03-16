import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { extname } from "path";
import { User, UserDocument } from "src/auth/schema/user.schema";
import { UserdDto } from "../dto/user.dto";
import sharp from 'sharp';

@Injectable()
export class UploadBannerService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async uploadBanner(file: Express.Multer.File, user: UserdDto) {
        const userProfile = await this.userModel.findById(user.id).select("-password");

        const buffer = await sharp(file.buffer)
            .resize(1178, 400)
            .toBuffer();

        const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;

        userProfile.banner = filename;

        await sharp(buffer).toFile(`./upload/${filename}`);

        return await userProfile.save();
    }
}
