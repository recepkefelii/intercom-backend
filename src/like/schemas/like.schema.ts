import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schema/user.schema';
import { Post } from '../../post/schemas/post.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    post: Post;

    @Prop({ default: Date.now })
    createdDate: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
