import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LikeDocument = Document & { user: Types.ObjectId, post: Types.ObjectId };

@Schema()
export class Like {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  @Prop({ default: Date.now })
  createdDate: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
