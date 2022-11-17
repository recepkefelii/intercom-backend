import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/index';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginAuthDto): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterAuthDto): Promise<{
        accessToken: string;
    }>;
}
