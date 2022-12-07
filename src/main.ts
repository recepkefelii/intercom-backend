import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create a cors header to allow cross origin resource sharin
  const app = await NestFactory.create(AppModule , { cors: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe( { whitelist: true, forbidNonWhitelisted: true, transform: true, }));
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  await app.listen(8000);
}
bootstrap();
