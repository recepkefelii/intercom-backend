// create a auth dto
// Path: src\auth\dto\auth.dto.ts

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {

    // Username validation
    @IsNotEmpty()
    @IsString()
    username: string;

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

    // First name validation
    @IsNotEmpty()
    @IsString()
    firstName: string;
    


}
