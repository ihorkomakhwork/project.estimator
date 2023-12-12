import npm from '../../../lib/npm';

export default (logger, config) => {
    try {
        const pool = new npm.pg.Pool(config.db);
        pool.on('error', (err) => {
            logger.error(err);
            pool.end();
            throw err;
        });
        return pool;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
