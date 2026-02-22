import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/types';

export abstract class BaseRepository<T extends keyof DB> {
  protected abstract readonly table: T;
  protected abstract readonly idColumn: keyof DB[T];

  constructor(
    @Inject('DB') protected readonly db: Kysely<DB>,
  ) {}

  async findAll() {
    return await this.db.selectFrom(this.table).selectAll().execute();
  }

  async findById(id: string) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .where(this.idColumn as any, '=', id as any)
      .executeTakeFirst();
  }

  async deleteById(id: string) {
    return await this.db
      .deleteFrom(this.table)
      .where(this.idColumn as any, '=', id as any)
      .execute();
  }

  async findWhere(where: any) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .where(where)
      .executeTakeFirst();
  }

  async pullWhere(where: any) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .where(where)
      .execute();
  }
}