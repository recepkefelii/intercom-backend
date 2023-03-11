import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schema/user.schema";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
    controllers: [LoginController],
    providers: [LoginService, JwtService, ConfigService],
})
export class LoginModule { }