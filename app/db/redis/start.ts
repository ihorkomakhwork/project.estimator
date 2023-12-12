import npm from '../../../lib/npm';

export default async (logger, config) => {
    try {
        const client = npm.redis.createClient(config.chache);
        client.on('error', (error: Error) => {
            logger.warn('No redis service detected, so quit client');
            client.quit();
            throw error;
        });
        const connection = await client.connect();
        return connection;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
