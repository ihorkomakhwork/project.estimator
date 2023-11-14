import npm from '../../../lib/npm';

export default (logger, config) => {
    try {
        const pool = new npm.pg.Pool(config);
        return {
            query: async (text, params) => await pool.query(text, params),
            end: () => pool.end(),
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
