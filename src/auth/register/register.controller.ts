import { Body, Controller, Post } from "@nestjs/common";
import { UserdDto } from "src/users/dto/user.dto";
import { RegisterService } from "./register.service";

@Controller('auth')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }
    @Post('register')
    async register(@Body() body: UserdDto) {
        console.log(body);

        return this.registerService.register(body)
    }
}