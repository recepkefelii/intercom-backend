import { BadRequestException, Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/auth.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserdDto } from "src/users/dto/user.dto";
import { ChangePassWordDto } from "../dto/change.password.dto";
import { LoginDto } from "../dto/login.dto";
import { ChangePasswordService } from "./change.password.service";

@UseGuards(AuthGuard)
@Controller('auth')
export class ChangePasswordContreller {
    constructor(private readonly changePasswordService: ChangePasswordService) { }
    @Post('change-password')
    async changePassword(@Body() password: ChangePassWordDto, @CurrentUser() user: UserdDto) {
        console.log(user);
        
        try {
            await this.changePasswordService.changePassword(password, user);

            return {
                message: 'Request Change Password Successfully!',
                status: HttpStatus.OK,
            };
        } catch (err) {
            throw new BadRequestException('Error: Change password failed!');
        }
    }
}