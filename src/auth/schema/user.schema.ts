import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & User;
@Schema()
export class User {
 
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: Date.now })
    createdDate: Date;

    @Prop({ default: Date.now })
    updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
