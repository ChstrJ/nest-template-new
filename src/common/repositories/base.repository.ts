import { Inject } from '@nestjs/common';
import { Kysely, Updateable } from 'kysely';
import { DB } from 'src/database/types';

export abstract class BaseRepository<T extends keyof DB> {
  protected table: T;
  protected idColumn: keyof DB[T] = 'id' as any;
  protected builder: { statement: string; bindings: any[] }[] = [];

  constructor(@Inject('DB') protected readonly dbClient: Kysely<DB>) { }

  setTable(table: T) {
    this.table = table;
  }

  setIdColumn(column: keyof DB[T]) {
    this.idColumn = column;
  }

  get db() {
    return this.dbClient;
  }

  async insert(data: any) {
    try {
      return await this.db.insertInto(this.table).values(data).execute();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll() {
    return await this.db.selectFrom(this.table).selectAll().execute();
  }

  async findById(id: string) {
    return await this.db
      .selectFrom(this.table)
      .selectAll()
      // @ts-ignore
      .where(this.idColumn, '=', id)
      .executeTakeFirst();
  }

  async deleteById(id: string) {
    return await this.db
      .deleteFrom(this.table)
      // @ts-ignore
      .where(this.idColumn, '=', id)
      .execute();
  }

  async findWhere(where: Partial<DB[T]>, columns?: (keyof DB[T])[]) {
    let query = this.db.selectFrom(this.table)

    // select columns or all
    if (columns && columns.length > 0) {
      // @ts-ignore
      query = query.select(columns as any);
    } else {
      // @ts-ignore
      query = query.selectAll();
    }

    // dynamically add where conditions
    Object.entries(where).forEach(([col, value]) => {
      // @ts-ignore
      query = query.where(col as keyof DB[T], '=', value);
    });

    try {
      return await query.executeTakeFirst();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async pullWhere(where: Partial<DB[T]>, columns?: (keyof DB[T])[]) {
    let query = this.db.selectFrom(this.table);

    // select columns or all
    if (columns && columns.length > 0) {
      // @ts-ignore
      query = query.select(columns as any);
    } else {
      // @ts-ignore
      query = query.selectAll();
    }

    // dynamically add where conditions
    Object.entries(where).forEach(([col, value]) => {
      // @ts-ignore
      query = query.where(col as keyof DB[T], '=', value);
    });

    try {
      return await query.execute();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateWhere(where: Partial<DB[T]>, set: Partial<Updateable<DB[T]>>) {
    let query = this.db.updateTable(this.table)

    // dynamically add where conditions
    Object.entries(where).forEach(([col, value]) => {
      // @ts-ignore
      query = query.where(col as keyof DB[T], '=', value);
    });

    // dynamically add set conditions
    Object.entries(set).forEach(([col, value]) => {
      // @ts-ignore
      query = query.set(col as keyof DB[T], value);
    });

    try {
      return await query.execute();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteWhere(where: Partial<DB[T]>) {
    let query = this.db.deleteFrom(this.table)

    // dynamically add where conditions
    Object.entries(where).forEach(([col, value]) => {
      // @ts-ignore
      query = query.where(col as keyof DB[T], '=', value);
    });

    try {
      return await query.execute();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  startBuild(statement: string, bindings: any[] = []) {
    this.builder.push({ statement, bindings });
    return this;
  }

  appendBuild() {

  }

  getBuild() {
    return this.builder;
  }

  clearBuild() {
    this.builder = [];
    return this;
  }

  async executeBuild() {
    if (!this.builder.length) return [];

    const sql = this.builder.map(b => b.statement).join(' ');
    const bindings = this.builder.flatMap(b => b.bindings);

    this.clearBuild();

    //return this.db.execute(sql`${sql.raw(queryString, ...bindings)}`);
  }
}
