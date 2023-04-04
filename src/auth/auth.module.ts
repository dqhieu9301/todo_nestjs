
import { UserModule } from './../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entity/user.entity';
import { AuthController } from './auth.controller';
import { Token } from '../entity/token.entity';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([User, Token]), JwtModule.register({global: true})],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
