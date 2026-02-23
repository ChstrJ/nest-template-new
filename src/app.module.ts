import { Module } from '@nestjs/common';
import { AccountModule } from './features/account/account.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, appConfig],
    }),
    DatabaseModule,
    LoggerModule,
    AccountModule
  ],
})
export class AppModule { }
