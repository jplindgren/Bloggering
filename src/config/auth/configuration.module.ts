import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { OAuth2ConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        OAUTH2_CLIENTID: Joi.string(),
        OAUTH2_CLIENT_SECRET: Joi.string(),          
        OAUTH2_JWT_SECRET: Joi.string(),        
      }),
    }),
  ],
  providers: [ConfigService, OAuth2ConfigService],
  exports: [ConfigService, OAuth2ConfigService],
})
export class OAuth2ConfigModule {}