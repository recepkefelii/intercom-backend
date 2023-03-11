import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schema/user.schema';
import { Like } from '../../like/schemas/like.schema';
import { Comment } from '../../comment/schemas/comment.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdDate: Date;

    @Prop({ type: [Types.ObjectId], ref: 'Like', default: [] })
    likes: Like[];

    @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
