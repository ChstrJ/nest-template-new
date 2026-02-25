// src/commands/commands.module.ts
import { Module } from '@nestjs/common';
import { HelloCommand } from './hello.command';

@Module({
  providers: [HelloCommand]
})

export class CommandModule { }
