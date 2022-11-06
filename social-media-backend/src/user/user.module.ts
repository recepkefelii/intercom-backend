import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [],
  providers: [PrismaService],
})
export class UserModule {}
