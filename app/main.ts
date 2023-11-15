import app from './application';
import lib from '../lib/lib';

new lib.Server(app);

process.on('uncaughtException', (err) => {
    app.logger.info('uncaughtException');
    app.logger.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    app.logger.info('unhandledRejection');
    app.logger.error(err);
    process.exit(1);
});
