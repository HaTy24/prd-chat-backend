import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { Account } from 'src/account/entities/account.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/packages/guards/jwt.strategy';
import { AccountService } from 'src/account/account.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('JWT_SECRET'),
        };
      },
    }),
  ],
  exports: [JwtStrategy],
  providers: [AuthResolver, AuthService, JwtStrategy, AccountService],
})
export class AuthModule {}
