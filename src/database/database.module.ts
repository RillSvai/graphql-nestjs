import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('PG_HOST'),
        port: configService.getOrThrow('PG_PORT'),
        username: configService.getOrThrow('PG_USERNAME'),
        database: configService.getOrThrow('PG_DATABASE'),
        synchronize: configService.getOrThrow('PG_SYNC'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
