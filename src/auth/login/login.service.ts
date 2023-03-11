import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDto } from "../dto/login.dto";
import { User, UserDocument } from "../schema/user.schema";
import * as bcrypt from 'bcrypt';
import { IUserPayload } from "../interface/user.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoginService {
    logger: Logger
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.logger = new Logger()
    }

    async login(body: LoginDto) {
        const user = await this.userModel.findOne({ email: body.email });

        if (!user) {
            throw new NotFoundException('No account with this email was found')
        }

        const decode = await bcrypt.compare(body.password, user.password)

        if (!decode) {
            throw new UnauthorizedException('Authentication failed. Wrong password')
        }

        const payload: IUserPayload = {
            email: user.email,
            name: user.name,
            id: String(user._id)
        }

        return this.jwtSign(payload)
    }

    async jwtSign(payload: IUserPayload) {
        const secret = this.configService.getOrThrow<string>("JWT_SECRET_KEY")
        const accsessToken = this.jwtService.sign(payload, { secret })
        return { accessToken: accsessToken }
    }
}