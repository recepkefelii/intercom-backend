import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { Follow, FollowDocument } from './schema/follow.schema';

@Injectable()
export class FollowService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Follow.name) private followModel: Model<FollowDocument>
    ) { }
    async follow(followerId: string, followingId: string): Promise<User> {
        const follower = await this.userModel.findById(followerId);
        const following = await this.userModel.findById(followingId);
    
        if (!follower || !following) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const existingFollow = await this.followModel.findOne({
          follower: follower._id,
          following: following._id,
        });
    
        if (existingFollow) {
          throw new HttpException('Already following', HttpStatus.BAD_REQUEST);
        }
    
        const newFollow = new this.followModel({
          follower: follower._id,
          following: following._id,
        });
    
        await newFollow.save();
    
        follower.following.push(following._id);
        follower.followingCount++;
        await follower.save();
    
        following.followers.push(follower._id);
        following.followersCount++;
        await following.save();
    
        const updatedFollower = await this.userModel
          .findById(follower._id)
          .populate('following', '-password')
          .populate('followers', '-password')
          .exec();
    
        return updatedFollower as User;
      }

      async unFollow(followerId: string, followingId: string): Promise<User> {
        const follower = await this.userModel.findById(followerId);
        const following = await this.userModel.findById(followingId);
      
        if (!follower || !following) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      
        const existingFollow = await this.followModel.findOne({
          follower: follower._id,
          following: following._id,
        });
      
        if (!existingFollow) {
          throw new HttpException('Not following', HttpStatus.BAD_REQUEST);
        }
      
        await existingFollow.deleteOne();
      
        follower.following = follower.following.filter(id => id.toString() !== following._id.toString());
        follower.followingCount--;
        await follower.save();
      
        following.followers = following.followers.filter(id => id.toString() !== follower._id.toString());
        following.followersCount--;
        await following.save();
      
        const updatedFollower = await this.userModel
          .findById(follower._id)
          .populate('following', '-password')
          .populate('followers', '-password')
          .exec();
      
        return updatedFollower as User;
      }
      

}
