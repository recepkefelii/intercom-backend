import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schema/user.schema';

@Schema()
export class Follow {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  follower: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  following: User;

  @Prop({ default: Date.now })
  createdDate: Date;
}

export type FollowDocument = Follow & Document;
export const FollowSchema = SchemaFactory.createForClass(Follow);
