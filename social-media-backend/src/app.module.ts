import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';


@Module({
  imports: [AuthModule,
  ConfigModule.forRoot({ isGlobal:true }),
  UserModule,
  FollowModule 
  ],
  
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
