import { PickType } from "@nestjs/mapped-types";
import { UserdDto } from "src/users/dto/user.dto";

export class ChangePassWordDto extends PickType(UserdDto, [
    'password',
] as const) { }