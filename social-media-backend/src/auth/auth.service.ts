import { Injectable } from '@nestjs/common';
import { LoginAuthDto,RegisterAuthDto } from './dto/index';

@Injectable()
export class AuthService {
  async login(loginDto: LoginAuthDto) {
    return 'login';
  }

  async register(registerDto: RegisterAuthDto) {
    return 'register';
  }
}
