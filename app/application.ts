import config from './config/config.dev';
import lib from '../lib/lib';
import npm from '../lib/npm';
import node from '../lib/node';

import filter from './error/filter';
import pg from './db/pg/start';
import redis from './db/redis/start';

const container = npm.awilix.createContainer({
    injectionMode: 'PROXY',
});

const logger = npm.pino(config.log);

container.register({
    db: npm.awilix.asValue(pg(logger, config.db)),
    cache: npm.awilix.asValue(redis(logger)),
    lib: npm.awilix.asValue(lib),
    npm: npm.awilix.asValue(npm),
    node: npm.awilix.asValue(node),
    config: npm.awilix.asValue(config),
    logger: npm.awilix.asValue(logger),
});
const load = lib.util.di.autoLoad(container);

load.model('./model');
load.hooks('./hook');
load.api('./api');
load.service('./service');

container.register({
    createContext: npm.awilix.asValue(lib.util.di.specifyScope(container)),
    has: npm.awilix.asValue(container.hasRegistration.bind(container)),
    errorFilter: npm.awilix.asFunction(filter),
});

export default container.cradle;
