import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
    // Password validation
    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    password: string;

    // Email validation
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    // Username validation
    @IsNotEmpty()
    @IsString()
    username: string;
}
