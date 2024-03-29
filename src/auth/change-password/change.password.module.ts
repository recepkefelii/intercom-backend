import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "src/common/mail/mail.module";
import { User, UserSchema } from "../schema/user.schema";
import { ChangePasswordContreller } from "./change.password.controller";
import { ChangePasswordService } from "./change.password.service";

@Module({
    imports: [MailModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [ChangePasswordContreller],
    providers: [ChangePasswordService,
        JwtService,
    ]
})
export class ChangePasswordModule { }