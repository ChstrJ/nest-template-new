import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
    client: 'mysql2',
    connection: {
        port: Number(process.env.DATABASE_PORT) ?? 3306,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    migrations: {
        directory: './src/database/migrations',
        extension: 'ts',
    },
};

export default config;