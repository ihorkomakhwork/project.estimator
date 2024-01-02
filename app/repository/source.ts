import ICRUD from '../contract/icrud';
import ITransaction from '../contract/itransaction';
import ISource from '../contract/isource';

export default ({ db, lib, logger }): ISource => ({
    crud<TRecord>(table): ICRUD<TRecord> {
        return {
            db: db,
            get table(): string {
                return table.toLowerCase();
            },

            set connection(db) {
                this.db = db;
            },

            async query(sql: string, args: any[] = []): Promise<any> {
                return await this.db.query(sql, args);
            },
            where(params: Partial<TRecord>): { where: string; values: any[] } {
                const keys = Object.keys(params);
                const values = Object.values(params);
                const conditions = new Array(keys.length);
                const callback = (key, i) =>
                    (conditions[i] = `${lib.util.common.camelToSnake(
                        key,
                    )} = $${++i}`);
                keys.forEach(callback);
                const where = ` WHERE ${conditions.join(' AND ')}`;
                return { where, values };
            },

            async getColumns(): Promise<Array<string>> {
                const sql = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
                const res = await this.query(sql, [this.table]);
                return res.rows.map(({ column_name }) =>
                    lib.util.common.snakeToCamel(column_name),
                );
            },

            createAlias(fields: any[]): string {
                return fields
                    .map((alias) => {
                        const name = lib.util.common.camelToSnake(alias);
                        return `${name} AS "${alias}"`;
                    })
                    .join(', ');
            },
            async read(
                conditions: Partial<TRecord> = {},
                fields: any[] = ['*'],
            ): Promise<Array<TRecord>> {
                let where = '';
                let values = [];
                const isConditions = Object.keys(conditions).length;
                if (isConditions) {
                    const result = this.where(conditions);
                    where = result.where;
                    values = result.values;
                }
                const [field] = fields;
                if (field === '*') fields = await this.getColumns();
                const names = this.createAlias(fields);
                const sql = `SELECT ${names} FROM ${this.table}` + where;
                logger.info(sql, values);
                return this.query(sql, values);
            },

            async readById(
                id: number,
                fields: any[] = ['*'],
            ): Promise<Array<TRecord>> {
                const [field] = fields;
                if (field === '*') fields = await this.getColumns();
                const names = this.createAlias(fields);
                const sql = `SELECT ${names} FROM ${this.table}`;
                if (!id) return await this.query(sql);
                logger.info(sql, id);
                return await this.query(`${sql} WHERE id = $1`, [id]);
            },

            async create(record: TRecord) {
                const keys = Object.keys(record).map(
                    lib.util.common.camelToSnake,
                );
                const nums = new Array(keys.length);
                const data = new Array(keys.length);
                keys.forEach((key, i) => {
                    data[i] = record[lib.util.common.snakeToCamel(key)];
                    nums[i] = `$${++i}`;
                });
                const fields = `"${keys.join('", "')}"`;
                const params = nums.join(', ');
                const sql = `INSERT INTO "${this.table}" (${fields}) VALUES (${params})`;
                logger.info(sql, data);
                return await this.query(sql, data);
            },

            async update(
                id: number,
                record: Partial<TRecord>,
            ): Promise<Array<TRecord>> {
                const keys = Object.keys(record).map(
                    lib.util.common.camelToSnake,
                );
                const updates = new Array(keys.length);
                const data = new Array(keys.length);
                let i = 0;
                keys.forEach((key) => {
                    data[i] = record[lib.util.common.snakeToCamel(key)];
                    updates[i] = `${key} = $${++i}`;
                });
                const delta = updates.join(', ');
                const sql = `UPDATE ${this.table} 
                SET ${delta} WHERE id = $${++i}`;
                data.push(id);
                logger.info(sql, data);
                return await this.query(sql, data);
            },

            async delete(id: number): Promise<Array<TRecord>> {
                const sql = `DELETE FROM ${this.table} WHERE id = $1`;
                logger.info(sql, id);
                return await this.query(sql, [id]);
            },
        };
    },
    // Refactor in future
    async transact(
        sources: Array<ICRUD<any>>,
        callback: (trx: ITransaction) => Promise<void>,
    ): Promise<void> {
        const connection = await db.connect();
        const trx = {};
        for (const source of sources) {
            source.connection = connection;
            trx[source.table] = source;
        }
        try {
            await connection.query('BEGIN');
            await callback(trx);
            await connection.query('COMMIT');
        } catch (error) {
            logger.info('ROLLBACK');
            await connection.query('ROLLBACK');
            throw error;
        } finally {
            logger.info('RELEASE');
            for (const source of sources) {
                source.connection = db;
            }
            await connection.release();
        }
    },
});
