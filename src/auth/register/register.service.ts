import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import * as bcrypt from 'bcrypt';
import { IUserPayload } from "../interface/user.interface";
import { ConfigService } from "@nestjs/config";
import { MailService } from "src/common/mail/mail.service";
import { UserdDto } from "src/users/dto/user.dto";

@Injectable()
export class RegisterService {
    logger: Logger
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configServie: ConfigService,
        private readonly mailerService: MailService,
    ) {
        this.logger = new Logger()
    }
    async register(body: UserdDto) {
        try {

            // Hashed password
            const password = body.password
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            // Create Payload
            const payload: IUserPayload = {
                name: body.name,
                email: body.email,
            }

            // Create User
            await this.userModel.create({
                name: body.name,
                email: body.email,
                password: hashedPassword
            })

            // this.sendMailRegisterUser(body)
            return this.jwtSign(payload)

        } catch (error) {
            this.logger.error(error.message)
            throw new HttpException("There is already an account using this email", HttpStatus.CONFLICT)
        }

    }
    async jwtSign(payload: IUserPayload) {
        const secret = this.configServie.getOrThrow<string>("JWT_SECRET_KEY")
        const accsessToken = this.jwtService.sign(payload, { secret });
        return { accessToken: accsessToken }
    }

    private sendMailRegisterUser(user: UserdDto): void {
        try {
            this.mailerService.sendMail({
                to: user.email,
                from: 'from@example.com',
                subject: 'Registration successful ✔',
                text: 'Registration successful!',
                template: 'index',
                context: {
                    title: 'Registration successfully',
                    description:
                        "You did it! You registered!, You're successfully registered.✔",
                    nameUser: user.name,
                },
            });
            Logger.log('[MailService] User Registration: Send Mail successfully!');
        } catch (err) {
            Logger.error('[MailService] User Registration: Send Mail failed!', err);
        }
    }

}