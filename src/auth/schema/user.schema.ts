import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  profil_photo_url: string;

  @Prop({ unique: true })
  banner_url: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ default: Date.now })
  updatedDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  following: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followers: Types.ObjectId[];

  @Prop({ default: 0 })
  followingCount: number;

  @Prop({ default: 0 })
  followersCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Types.ObjectId[];

  @Prop({ default: 0 })
  postsCount: number
}

export const UserSchema = SchemaFactory.createForClass(User);