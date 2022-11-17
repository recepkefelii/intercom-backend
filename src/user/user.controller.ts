import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard,GetUser } from 'src/common/index';

@UseGuards(AuthGuard)
@Controller('profile')
export class UserController {

  @Get()
  getMe(@GetUser() user) {
    console.log(user);
    
    return user;
  }
}