import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    id: string
}