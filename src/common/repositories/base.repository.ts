import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/types';

export abstract class BaseRepository<T extends keyof DB> {
  protected table: T;
  protected idColumn: keyof DB[T] = 'id' as any;

  constructor(@Inject('DB') protected readonly db: Kysely<DB>) { }

  setTable(table: T) {
    this.table = table;
  }

  setIdColumn(column: keyof DB[T]) {
    this.idColumn = column;
  }

  async findAll() {
    return await this.db.selectFrom(this.table).selectAll().execute();
  }

  async findById(id: string) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .executeTakeFirst();
  }

  async deleteById(id: string) {
    return await this.db
      .deleteFrom(this.table)
      .execute();
  }

  async findWhere(where: any) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .executeTakeFirst();
  }

  async pullWhere(where: any) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      .execute();
  }
}
