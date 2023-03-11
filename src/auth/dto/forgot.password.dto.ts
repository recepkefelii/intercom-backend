import { PickType } from "@nestjs/mapped-types";
import { UserdDto } from "src/users/dto/user.dto";

export class ForgotPassswordDto extends PickType(UserdDto, [
    'email',
] as const) { }