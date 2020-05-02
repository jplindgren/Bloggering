import { Module } from '@nestjs/common';
import configuration from './configuration';
import { OrmConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  providers: [ConfigService, OrmConfigService],
  exports: [ConfigService, OrmConfigService],
})
export class OrmConfigModule { }