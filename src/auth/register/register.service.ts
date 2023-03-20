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
import { v4 as uuidv4 } from 'uuid';

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
            const password = body.password
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)



            const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            const InitphotoUrl = uuidv4()
            const InitBanner = uuidv4()

            const user = await this.userModel.create({
                name: body.name,
                profil_photo_url: InitphotoUrl.toString(),
                banner_url: InitBanner.toString(),
                username: randomNumber.toString(),
                email: body.email,
                password: hashedPassword
            })

            const payload: IUserPayload = {
                name: body.name,
                username: body.name + randomNumber,
                email: body.email,
                id: user.id
            }

            // this.sendMailRegisterUser(body)
            return this.jwtSign(payload)
        } catch (error) {
            if (error.code === 11000) {

                let errorMessage = "The email and username should be unique"
                if (error.keyValue.email) {
                    errorMessage = "There is already an account using this email"
                } else if (error.keyValue.username) {
                    errorMessage = "There is already an account using this username"
                }
                throw new HttpException(errorMessage, HttpStatus.CONFLICT)
            }
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