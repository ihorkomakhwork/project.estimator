import config from './config/config.dev';
import lib from '../lib/lib';
import npm from '../lib/npm';
import node from '../lib/node';

import Ajv from 'ajv/dist/jtd';
import redisStart from './db/redis/start';
import pgStart from './db/pg/start';
import source from './repository/source';

import mapper from './repository/mapper';
import globalErrorFilter from './error/filter/global';
import dalErrorFilter from './error/filter/dal';
import IContainer from './contract/icrontainer';

const container = npm.awilix.createContainer<IContainer>({
    injectionMode: 'PROXY',
});

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword('format');
const PG_INTERVAL_REGEX =
    '^(?!.*(second|minute|hour|day|week|month|year).*\x01)d+s+(?:second|minute|hour|day|week|month|year)s?(?:s+d+s+(?:second|minute|hour|day|week|month|year)s?)*$';
ajv.addFormat('interval', PG_INTERVAL_REGEX);
const PHONE_REGEX = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$';
ajv.addFormat('phone', PHONE_REGEX);

const logger = npm.pino(config.log);
const redis = await redisStart(logger, config);
const pg = pgStart(logger, config);

container.register({
    lib: npm.awilix.asValue(lib),
    npm: npm.awilix.asValue(npm),
    node: npm.awilix.asValue(node),
    config: npm.awilix.asValue(config),
    logger: npm.awilix.asValue(logger),
    db: npm.awilix.asValue(pg),
    cache: npm.awilix.asValue(redis),
    source: npm.awilix.asFunction(source),
    repository: npm.awilix.asFunction(mapper),
    schema: npm.awilix.asValue(ajv),
    globalErrorFilter: npm.awilix.asFunction(globalErrorFilter),
    dalErrorFilter: npm.awilix.asFunction(dalErrorFilter),
});
const loader = lib.util.di.createLoader(container);

loader.loadModule('./schema', 'Schema');
loader.loadModule('./repository/model', 'Entity');
loader.loadModule('./service', 'Service');
loader.loadModule('./hook', 'Hooks');
loader.loadApi('./api');

container.register({
    createContext: npm.awilix.asValue(lib.util.di.specifyScope(container)),
    has: npm.awilix.asValue(container.hasRegistration.bind(container)),
});

//console.log(container.registrations);

export default container.cradle;
