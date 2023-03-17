import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, })
  name: string;

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({unique: true})
  profil_photo_url: string;

  @Prop({unique: true})
  banner_url: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ default: Date.now })
  updatedDate: Date;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  following: User[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  followers: User[];

  @Prop({ default: 0 })
  followingCount: number

  @Prop({ default: 0 })
  followersCount: number
}

export const UserSchema = SchemaFactory.createForClass(User);
