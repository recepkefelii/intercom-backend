import { Injectable } from '@nestjs/common';
import { IUserInfo } from 'src/common/interface';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor() {}

    createPost(user: IUserInfo,data:PostDto) {
        return data;
    }
}
