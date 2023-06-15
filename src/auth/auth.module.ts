import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/user.entity';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy"
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule.register({ session: true })],
  providers: [AuthService,LocalStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
