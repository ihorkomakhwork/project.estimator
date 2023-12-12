import type { IConfig } from '../../lib/lib';
import node from '../../lib/node';

const config: IConfig = {
    app: {
        path: node.path.join(node.process.cwd(), '/app'),
        ext: '.ts',
        protocol: 'http',
        port: 3000,
    },
    awilix: {
        autoLoading: {
            pathPattern: '/**/!(*.spec|*.d|*.test)*.{js,ts}',
        },
    },
    db: {
        host: 'postgres-container',
        port: 5432,
        database: 'DBEstimator',
        user: 'postgres',
        password: 'postgres',
    },
    chache: {
        url: 'redis://redis-container:6379',
    },
    log: {
        transport: {
            target: 'pino-pretty',
        },
        options: {
            colorize: true,
        },
    },
    auth: {
        secret: 'secret',
    },
};

export default config;
