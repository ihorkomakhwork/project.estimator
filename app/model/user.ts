export default ({ db, logger }) => ({
    table: 'pg_tables',
    async read() {
        try {
            const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
            const sql = `SELECT ${fields} FROM ${this.table} WHERE tableowner = $1`;
            const { rows } = await db.query(sql, ['postgres']);
            logger.info(rows);
            return rows;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
});
