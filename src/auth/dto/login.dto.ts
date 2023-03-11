import { PickType } from "@nestjs/mapped-types";
import { UserdDto } from "src/users/dto/user.dto";

export class LoginDto extends PickType(UserdDto, [
    'email',
    'password',
] as const) { }