import { Module } from '@nestjs/common';
import { AccountModule } from './features/account/account.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, appConfig],
    }),
    DatabaseModule,
    AccountModule
  ],
})
export class AppModule { }
