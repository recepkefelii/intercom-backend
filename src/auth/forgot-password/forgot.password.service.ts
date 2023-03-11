import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MailService } from "src/common/mail/mail.service";
import { ForgotPassswordDto } from "../dto/forgot.password.dto";
import { User, UserDocument } from "../schema/user.schema";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly mailService: MailService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }
    async forgotPassword(body: ForgotPassswordDto) {
        const saltRounds = 10
        const newPassword = crypto.randomUUID();
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)


        const filter = { email: body.email }
        const update = { password: hashedNewPassword }
        const options = { new: true }

        // this.sendMailForgotPassword(body.email, newPassword)

        return await this.userModel.findOneAndUpdate(
            filter,
            update,
            options,
        );
    }

    private sendMailForgotPassword(email: string, password: string): void {
        try {
            this.mailService.sendMail({
                to: email,
                from: 'from@example.com',
                subject: 'Forgot Password successful ✔',
                text: 'Forgot Password successful!',
                template: 'index',
                context: {
                    title: 'Forgot Password successful!',
                    description:
                        'Request Reset Password Successfully!  ✔, This is your new password: ' +
                        password,
                },
            });
            Logger.log('[MailService] Forgot Password: Send Mail successfully!');
        } catch (err) {
            Logger.error('[MailService] Forgot Password: Send Mail Failed!', err);
        }
    }
}