import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
    @UseGuards(AuthGuard)
    @Get('profile')
    async getUser() {
        console.log("hello world");

    }

}
