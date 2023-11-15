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
    auth: {
        strategy: 'jwt',
        secret: 'secret',
        tokens: {
            access: {
                expiresIn: '1m',
            },
            refresh: {
                expiresIn: '1h',
            },
        },
    },
    db: {
        host: 'postgres-container',
        port: 5432,
        database: 'DBEstimator',
        user: 'postgres',
        password: 'postgres',
    },
    log: {
        transport: {
            target: 'pino-pretty',
        },
        options: {
            colorize: true,
        },
    },
};

export default config;
