import npm from '../../../lib/npm';

export default async (logger) => {
    const client = npm.redis.createClient();
    client.on('error', (error: Error) => {
        logger.warn('No redis service detected, so quit client');
        client.quit();
        throw error;
    });
    return await client;
};
