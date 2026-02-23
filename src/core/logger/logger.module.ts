import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global() // makes LoggerService available app-wide without importing
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})

export class LoggerModule { }
