import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { UploadBannerService } from './banner-upload/upload.banner.service';
import { UserdDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly uploadBannerServive: UploadBannerService
    ) {

    }
    async userProfile(user: UserdDto) {
        return await this.userModel.findById(user.id).select("-password")
    }
}
