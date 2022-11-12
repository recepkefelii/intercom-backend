import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'images'),
    serveRoot: '/images',
  })],

  
  
})
export class FileModule {}
