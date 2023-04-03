import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { GroupModule } from './group/group.module';
import { GroupManagementModule } from './group-management/group-management.module';
import { ChatRoomModule } from './chat-room/chat-room.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'prd-chat',
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
