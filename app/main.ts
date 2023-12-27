import app from './application';
import lib from '../lib/lib';

await app.db.query('TRUNCATE TABLE users CASCADE;');

app.logger.info('Starting application...');
//throw new Error('test');
new lib.Server(app);

process.on('uncaughtException', (err) => {
    app.logger.info('Gracefully shutting down...');
    app.logger.info('uncaughtException');
    app.logger.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    app.logger.info('Gracefully shutting down...');
    app.logger.info('unhandledRejection');
    app.logger.error(err);
    process.exit(1);
});
