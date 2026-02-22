import { Inject, Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/repositories/base.repository";
import { Kysely } from "kysely";
import { DB } from "src/database/types";

@Injectable()
export class AccountRepository extends BaseRepository<'account'>{
    protected readonly table: 'account' = 'account';
    protected readonly idColumn: 'account_id' = 'account_id';

    constructor(@Inject('DB') db: Kysely<DB>) {
        super(db);
    }
}