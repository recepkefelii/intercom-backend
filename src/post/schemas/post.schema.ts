import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PostDocument = Document & { author: Types.ObjectId } & Post;
@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  author: Types.ObjectId;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ default: Date.now })
  updatedDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
