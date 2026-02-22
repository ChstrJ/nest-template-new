import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AccountRepository } from './account.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
