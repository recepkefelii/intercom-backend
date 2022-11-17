import { LoginAuthDto, RegisterAuthDto } from './dto/index';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly configService;
    private readonly userRepository;
    constructor(configService: ConfigService, userRepository: PrismaService);
    login(loginDto: LoginAuthDto): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterAuthDto): Promise<{
        accessToken: string;
    }>;
    payload<T extends object>(payload: T): string;
}
