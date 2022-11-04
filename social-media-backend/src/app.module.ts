import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';


@Module({
  imports: [AuthModule,
  ConfigModule.forRoot({ isGlobal:true }),
  TypeOrmModule.forRootAsync(typeOrmConfig),
  UserModule,
  FollowModule 
  ],
  
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
