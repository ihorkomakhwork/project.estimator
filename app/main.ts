import app from './application';
import lib from '../lib/lib';

app.logger.info('Starting application...');

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
