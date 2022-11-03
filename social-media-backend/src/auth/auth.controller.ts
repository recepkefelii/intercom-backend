import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: AuthDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: AuthDto) {
        return this.authService.register(registerDto);
    }

}
