import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schema/user.schema';
import { Post } from '../../post/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
