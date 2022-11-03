import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { IRegisterPaylaod } from './interface/index';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async login(loginDto: LoginAuthDto) {
        return 'login';
    }

    async register(registerDto: RegisterAuthDto) {
        // Hasef the password
        registerDto.password = await hash(registerDto.password);

        try {
            // Create a new user
            const user = await this.userRepository.save(registerDto);

            // Payload to be sent to the client
            const payload: IRegisterPaylaod = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                about: user.about,
                ProfilPhotoPath: user.ProfilPhotoPath,
            };

            // Create a token
            const accessToken = this.registerPayload(payload);
            // Return the token
            return { accessToken };
        } catch (error) {
            if (error.code === '23505') {
                throw new ForbiddenException('User email already exists');
            }
            throw new Error(error);
        }
    }

    registerPayload(payload: IRegisterPaylaod) {
        // create a refresh token
        return sign(payload, this.configService.get('SECRET_KEY'));
    }
}
