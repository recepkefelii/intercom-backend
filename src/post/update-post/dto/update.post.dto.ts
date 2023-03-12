import { IsNotEmpty, IsString } from "class-validator";

export class PostUpdateDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsString()
    @IsNotEmpty()
    content?: string

    @IsString()
    @IsNotEmpty()
    title?: string
}