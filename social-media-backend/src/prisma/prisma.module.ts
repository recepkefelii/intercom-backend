import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
