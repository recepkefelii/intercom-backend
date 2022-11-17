import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
