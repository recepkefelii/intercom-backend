import { BadRequestException, Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ForgotPassswordDto } from "../dto/forgot.password.dto";
import { ForgotPasswordService } from "./forgot.password.service";

@Controller('auth')
export class ForgotPasswordController {
    constructor(private readonly forgotPasswordService: ForgotPasswordService) { }
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPassswordDto) {
        try {
            await this.forgotPasswordService.forgotPassword(body);

            return {
                message: 'Request Reset Password Successfully!',
                status: HttpStatus.OK,
            };
        } catch (err) {
            throw new BadRequestException('Error: Forgot password failed!', { cause: err });
        }
    }
}