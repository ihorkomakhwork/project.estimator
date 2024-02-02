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

/**
 *TODO:
 * Refactoring
 */
const formatRoute = (fileName: string, discriptor: ModuleDescriptor): any => {
    const tmp = discriptor.path.split('/');
    const namespaceIndex = tmp.indexOf('api');
    const endpointIndex = tmp.indexOf(fileName + config.app.ext);
    const unsuccess = namespaceIndex === -1 || endpointIndex === -1;
    if (unsuccess) throw new Error('Can not find namespace or endpoint');
    const isBaseEndpoint = fileName === 'index';
    if (isBaseEndpoint) tmp.pop();
    const route = tmp
        .slice(namespaceIndex, endpointIndex + 1)
        .join('/')
        .replace(config.app.ext, '');
    return route;
};

const format = (dir) => (name) => name + dir;

const createLoader = (container: AwilixContainer) => ({
    loadApi: (path: string): void => {
        const autoRoutingOptions = { formatName: formatRoute };
        const api = loadDir(config.app.path, path);
        container.loadModules(api, autoRoutingOptions);
    },
    loadModule: (path: string, postfix: string): void => {
        const hooks = loadDir(config.app.path, path);
        const hookOptions = { formatName: format(postfix) };
        container.loadModules([...hooks], hookOptions);
    },
});

export default { createLoader, specifyScope };
