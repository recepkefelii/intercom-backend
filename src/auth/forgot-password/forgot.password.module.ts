import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "src/common/mail/mail.module";
import { User, UserSchema } from "../schema/user.schema";
import { ForgotPasswordController } from "./forgot.password.controller";
import { ForgotPasswordService } from "./forgot.password.service";

@Module({
    imports: [MailModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [ForgotPasswordController],
    providers: [ForgotPasswordService]
})
export class ForgotPaswordModule { }