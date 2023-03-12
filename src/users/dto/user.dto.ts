import { MaxLength, IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UserdDto {

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    readonly id: string

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