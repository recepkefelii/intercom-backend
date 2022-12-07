import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServerController } from './server/server.controller';


@Global()
@Module({
  imports: [AuthModule,
  ConfigModule.forRoot({ isGlobal:true }),
  UserModule,
  FollowModule,
  PrismaModule,
  FileModule,
  PostModule,
  ],
  
  providers: [ConfigService],
  
  controllers: [ServerController],
})
export class AppModule {}
