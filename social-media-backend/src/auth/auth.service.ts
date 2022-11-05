import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { ILoginPayload, IRegisterPaylaod } from './interface/index';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
    ) {}

    async login(loginDto: LoginAuthDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }

        const valid = await verify(user.password, loginDto.password);

        if (!valid) {
            throw new Error('password is not valid');
        }

        const payload: ILoginPayload = {
            email: user.email,
            password: user.password,
        };
        const accessToken = this.payload<ILoginPayload>(payload);
        return { accessToken };
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
            const accessToken = this.payload<IRegisterPaylaod>(payload);
            // Return the token
            return { accessToken };
        } catch (error) {
            if (error.code === '23505') {
                throw new ForbiddenException('User email already exists');
            }
            throw new Error(error);
        }
    }

    // Generic payload function
    payload<T extends object>(payload: T) {
        return sign(payload, this.configService.get('SECRET_KEY'));
    }
}
