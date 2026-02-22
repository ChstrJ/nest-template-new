import { Module } from '@nestjs/common';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Kysely<any>({
          dialect: new MysqlDialect({
            pool: createPool({
              port: config.get('database.mysql.port'),
              host: config.get('database.mysql.host'),
              user: config.get('database.mysql.username'),
              password: config.get('database.mysql.password'),
              database: config.get('database.mysql.name'),
            }),
          }),
        });
      },
    },
  ],
  exports: ['DB'],
})

export class DatabaseModule { }