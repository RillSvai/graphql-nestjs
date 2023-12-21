import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { AlsModule } from './als/als.module';
import { AlsMiddleware } from './als/als.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
      formatError: (error) => {
        const customError: GraphQLFormattedError = {
          message: error.message,
          extensions: {
            originalError: error.extensions?.originalError,
          },
        };
        return customError;
      },
    }),
    AlsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('graphql');
  }
}
