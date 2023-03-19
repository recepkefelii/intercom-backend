import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MailService } from "src/common/mail/mail.service";
import { LoginDto } from "../dto/login.dto";
import { User, UserDocument } from "../schema/user.schema";
import * as bcrypt from 'bcrypt';
import { UserdDto } from "src/users/dto/user.dto";
import { ChangePassWordDto } from "../dto/change.password.dto";
import { deflateRawSync } from "zlib";

@Injectable()
export class ChangePasswordService {
    constructor(
        private readonly mailService: MailService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }
    async changePassword(body: ChangePassWordDto, user: UserdDto): Promise<UserDocument> {
        try {
            // this.sendMailChangePassword(body.password, user)

            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(body.password, saltRounds)

            const filter = { email: user.email }
            const update = { password: hashedPassword }
            const options = { new: true }
            const updatedUser = await this.userModel.findOneAndUpdate(
                filter,
                update,
                options,
            );

            return updatedUser;
        } catch (error) {
            throw new HttpException(
                'Error updating password',
                400,
                { cause: error },
            )
        }
    }
    private sendMailChangePassword(password: string, user: UserdDto): void {
        try {
            this.mailService.sendMail({
                to: user.email,
                from: 'from@example.com',
                subject: 'Change Password successful ✔',
                text: 'Change Password successful!',
                template: 'index',
                context: {
                    title: 'Change Password successful!',
                    description:
                        'Change Password Successfully! ✔, This is your new password: ' +
                        password,
                    nameUser: user.name,
                },
            });
            Logger.log('[MailService] Change Password: Send Mail successfully!');
        } catch (err) {
            Logger.error('[MailService] Change Password: Send Mail Failed!', err);
        }
    }
}

