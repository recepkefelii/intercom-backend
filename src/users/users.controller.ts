import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserdDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get('profile')
    async userProfile(@CurrentUser() user: UserdDto) {
        return await this.userService.userProfile(user)
    }

}
