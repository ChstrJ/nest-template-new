import { Module } from '@nestjs/common';
import { AccountModule } from './features/account/account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AccountModule
  ],
})
export class AppModule { }
