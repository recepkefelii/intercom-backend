import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
