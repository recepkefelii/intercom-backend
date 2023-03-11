import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "src/common/mail/mail.module";
import { User, UserSchema } from "../schema/user.schema";
import { RegisterController } from "./register.controller";
import { RegisterService } from "./register.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MailModule],
    controllers: [RegisterController],
    providers: [RegisterService, JwtService, ConfigService],
})
export class RegisterModule { }