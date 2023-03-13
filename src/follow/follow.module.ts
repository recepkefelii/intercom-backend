import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schema/follow.schema';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [FollowController],
  providers: [FollowService,JwtService,]
})
export class FollowModule { }
