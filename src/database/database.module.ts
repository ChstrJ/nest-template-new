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
              port: config.get('database.mysql.port') || 3306,
              host: config.get('database.mysql.host') || 'localhost',
              user: config.get('database.mysql.username') || 'root',
              password: config.get('database.mysql.password') || '',
              database: config.get('database.mysql.name') || 'myapp_db',
            }),
          }),
        });
      },
    },
  ],
  exports: ['DB'],
})

export class DatabaseModule { }