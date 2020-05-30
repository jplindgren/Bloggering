import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { OAuth2ConfigModule } from './../config/auth/configuration.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/auth/configuration.service';

@Module({
  imports: [OAuth2ConfigModule,
    JwtModule.registerAsync({
      imports: [OAuth2ConfigModule],
      useClass: JwtConfigService
    })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule { }
