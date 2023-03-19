import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { PostDocument } from 'src/post/schemas/post.schema';
import { UploadBannerService } from './banner-upload/upload.banner.service';
import { UserdDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private readonly uploadBannerServive: UploadBannerService
    ) {

    }
    async userProfile(user: UserdDto) {
        const profile = await this.userModel
            .findOne({ id: user.id })
            .select("-password")
            .populate("posts");
        return profile;
    }
}
