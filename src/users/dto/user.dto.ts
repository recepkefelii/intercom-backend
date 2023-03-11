import { MaxLength, IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class UserdDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    readonly name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(60)
    password: string;
}