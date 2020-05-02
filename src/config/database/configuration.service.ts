import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const type: any = this.configService.get<string>('orm.type');
        return {
            type,
            host: this.configService.get<string>('orm.host'),
            username: this.configService.get<string>('orm.username'),
            password: this.configService.get<string>('orm.password'),
            database: this.configService.get<string>('orm.database'),
            port: this.configService.get<number>('orm.port'),
            logging: this.configService.get<boolean>('orm.logging'),
            entities: this.configService.get<string[]>('orm.entities'),
            migrations: this.configService.get<string[]>('orm.migrations'),
            migrationsRun: this.configService.get<boolean>('orm.migrationsRun'),
            synchronize: this.configService.get<boolean>('orm.sincronize'),
            cli: this.configService.get<any>('orm.cli'),
        };
    }
}
