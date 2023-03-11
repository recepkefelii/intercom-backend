import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'nodemailer-express-handlebars';

@Injectable()
export class MailService {
    private nodemailerTransport: Mail;

    constructor(private readonly configService: ConfigService) {
        this.nodemailerTransport = createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            auth: {
                user: this.configService.get<string>('EMAIL_AUTH_USER'),
                pass: this.configService.get<string>('EMAIL_AUTH_PASSWORD'),
            },
            debug: this.configService.get<boolean>('EMAIL_DEBUG'),
            logger: false,
        });

        const options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir:
                    process.cwd() +
                    `${this.configService.get<string>('EMAIL_LAYOUT_DIR')}`,
                defaultLayout: `${this.configService.get<string>(
                    'EMAIL_DEFAULT_LAYOUT',
                )}`, // name of main template
                partialsDir:
                    process.cwd() +
                    `${this.configService.get<string>('EMAIL_PARTIAL_DIR')}`,
            },
            viewPath:
                process.cwd() + `${this.configService.get<string>('EMAIL_VIEW_PATH')}`,
            extName: '.hbs',
        };
        this.nodemailerTransport.use('compile', hbs(options));
    }

    sendMail(options: any) {
        return this.nodemailerTransport.sendMail(options);
    }
}