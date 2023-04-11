import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { GroupModule } from './group/group.module';
import { GroupManagementModule } from './group-management/group-management.module';
import { ChatRoomModule } from './chat-room/chat-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/domain/entities/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AccountModule,
    GroupModule,
    GroupManagementModule,
    ChatRoomModule,
  ],
  providers: [],
})
export class AppModule {}
