import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [AuthModule,ConfigModule.forRoot({isGlobal:true}),
  TypeOrmModule.forRootAsync(typeOrmConfig)
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
