import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/repositories/base.repository";
import { Kysely } from "kysely";
import { DB } from "src/database/types";

@Injectable()
export class AccountRepository extends BaseRepository<'account'> {
    constructor(db: Kysely<DB>) {
        super(db);
        this.setTable('account')
        this.setIdColumn('account_id')
    }
}
