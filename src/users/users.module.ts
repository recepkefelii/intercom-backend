import { Module, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { PhotoUploadModule } from './photo-upload/photo.upload.module';
import { UploadBannerModule } from './banner-upload/upload.banner.module';
import { PostSchema } from 'src/post/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Post.name, schema: PostSchema }]),
    PhotoUploadModule,
    UploadBannerModule
  ],
  providers: [UsersService, JwtService
  ],
  controllers: [UsersController]
})
export class UsersModule { }
