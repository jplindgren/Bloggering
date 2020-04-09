import { registerAs } from '@nestjs/config';
import * as path from 'path';

const baseDir = path.join(__dirname, '../');
const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;
const migrationPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;

export default registerAs('orm', () => ({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: process.env.TYPEORM_LOGGING === "true",
    port: Number.parseInt(process.env.TYPEORM_PORT, 10),
    entities: [entitiesPath],
    migrations: [migrationPath],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
    seeds: ["src/migrations/seeds/*.seed.ts"],
    cli: {
      migrationsDir: "src/migrations",
      entitiesDir: "src/**/*.entity.ts",
    },
}));