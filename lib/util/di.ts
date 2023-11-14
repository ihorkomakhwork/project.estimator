import npm from '../npm';
import node from '../node';
import config from '../../app/config/config.dev';

import type { AwilixContainer, ModuleDescriptor } from '../npm';

const specifyScope = (container: AwilixContainer) => (specialScope: object) => {
    const scope = container.createScope();
    scope.register(specialScope);
    for (const key in specialScope) {
        const specialKey = specialScope[key];
        const value = npm.awilix.asValue(specialKey);
        container.register({ [key]: value });
    }
};

const loadDir = (base: string, namespacePath: string): [string] => [
    node.path.join(
        base,
        `${namespacePath}`,
        config.awilix.autoLoading.pathPattern,
    ),
];

const formatRoute = (name: string, discriptor: ModuleDescriptor): any => {
    const tmp = discriptor.path.split('/');
    const namespace = tmp.indexOf('api');
    const endpoint = tmp.indexOf(name + config.app.ext);
    const unsuccess = namespace === -1 || endpoint === -1;
    if (unsuccess) throw new Error('Can not find namespace or endpoint');
    const route = tmp
        .slice(namespace, endpoint + 1)
        .join('/')
        .replace(config.app.ext, '');
    return route;
};

const format = (dir) => (name) => name + dir;

const autoLoad = (container: AwilixContainer) => ({
    api: (path: string): void => {
        const autoRoutingOptions = { formatName: formatRoute };
        const api = loadDir(config.app.path, path);
        container.loadModules(api, autoRoutingOptions);
    },
    hooks: (path: string): void => {
        const hooks = loadDir(config.app.path, path);
        const hookOptions = { formatName: format('Hook') };
        container.loadModules([...hooks], hookOptions);
    },
    service: (path: string): void => {
        const services = loadDir(config.app.path, path);
        const serviceOptions = { formatName: format('Service') };
        container.loadModules([...services], serviceOptions);
    },
    model: (path: string): void => {
        const models = loadDir(config.app.path, path);
        const modelOptions = { formatName: format('Model') };
        container.loadModules([...models], modelOptions);
    },
});

export default { autoLoad, specifyScope };
