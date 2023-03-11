import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { LoginService } from "./login.service";

@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.loginService.login(body)
    }
}