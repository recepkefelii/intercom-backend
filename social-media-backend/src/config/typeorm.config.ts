import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

// Typeorm config
export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
    }),
    inject: [ConfigService],
};