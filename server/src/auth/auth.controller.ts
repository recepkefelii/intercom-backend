import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/index';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginAuthDto) {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterAuthDto) {
        return await this.authService.register(registerDto);
    }
}
