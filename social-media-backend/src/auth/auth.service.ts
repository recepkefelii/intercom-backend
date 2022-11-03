import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    async login(loginDto: AuthDto){
        return 'login';
    }

    async register(registerDto: AuthDto){
        return 'register';
    }
    
}
