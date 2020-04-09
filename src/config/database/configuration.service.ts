import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService {
  constructor(private configService: ConfigService) {}
  
  get getOrmOptions(): TypeOrmModuleOptions {
    const type: any = this.configService.get<string>('orm.type');
    return {
        type,
        host: this.configService.get<string>('orm.host'),
        username: this.configService.get<string>('orm.username'),
        password: this.configService.get<string>('orm.password'),
        database: this.configService.get<string>('orm.database'),
        port: this.configService.get<number>('orm.port'),
        logging: this.configService.get<boolean>('orm.logging'),
        entities: this.configService.get<string[]>('orm.entitiesPath'),
        migrations: this.configService.get<string[]>('orm.migrationPath'),
        migrationsRun: this.configService.get<boolean>('orm.migrationsRun'),
        cli: this.configService.get<object>('orm.migrationsRun')
      };
  } 
}

const ormConfigServiceInstance = new OrmConfigService(new ConfigService(process.env));
export { ormConfigServiceInstance };