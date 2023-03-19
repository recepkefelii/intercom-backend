import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { FollowModule } from './follow/follow.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    LikeModule,
    FollowModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGO_DB_URL")
      }),
      inject: [ConfigService]
    }),
    AwsS3Module
  ],
  controllers: [],
})
export class AppModule { }
