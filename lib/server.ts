import exeption from './exeption/exeption';
import transports from './transport';
import util from './util/util';
import type {
    IApplication,
    IServer,
    FHook,
    IEndpoint,
    IHooks,
    IRoute,
    IData,
    ICtx,
    TProcedures,
} from './contract';

class Chain {
    constructor(private hooks: Set<FHook> = new Set()) {}
    add(hooks: Array<FHook>) {
        if (hooks.length === 0) return;
        for (const hook of hooks) this.hooks.add(hook);
    }
    clear() {
        this.hooks.clear();
    }
    async process(data: IData): Promise<void> {
        for await (const hook of this.hooks) await hook(data);
    }
}

const PROCEDURE_PARAMS_REQUIRMENTS = {
    readById: ['id'],
    read: [],
    readByParams: ['params'],
    replace: ['id', 'payload'],
    create: ['payload'],
    updateById: ['id', 'payload'],
    update: ['payload'],
    updateByParams: ['params', 'payload'],
    deleteById: ['id'],
    delete: [],
    deleteByParams: ['params'],
};

export default class Server implements IServer {
    constructor(
        public application: IApplication,
        public appHooks: IHooks = { prev: [], after: [] },
    ) {
        const { protocol, port } = application.config.app;
        const transport = transports[protocol];
        transport(port, this.request.bind(this));
        const message = `${protocol.toUpperCase()} Server listen port: ${port}`;
        this.application.logger.info(message);
    }

    async request(ctx: ICtx) {
        try {
            const { socket, client, procedures, path, data } = ctx;
            this.application.createContext({ client });
            const infoObj = { procedures, path, socket };
            this.application.logger.info(infoObj, 'Request: ');
            const route = this.route(path, procedures, data);
            await this.processHooks(data, route.entity, route.endpoint);
            const result = await route.endpoint.method(data);
            const { code = 200, message = 'Ok' } = result;
            const responce = { ...result, code, message };
            this.application.logger.info(responce, 'Responce: ');
            return responce;
        } catch (error) {
            return this.application.globalErrorFilter(error);
        }
    }

    route(path: string, procedures: TProcedures, data: IData): IRoute {
        if (!procedures) throw new exeption.api.NotFound();
        const dataKeys = util.common.truelyObjKeys(data);
        for (const procedureName of procedures) {
            const requirement = PROCEDURE_PARAMS_REQUIRMENTS[procedureName];
            const match = util.common.compareArrs(requirement, dataKeys);
            if (!match) continue;
            const entity = this.application[path];
            if (!entity) throw new exeption.api.NotFound();
            let prop = entity[procedureName];
            if (!prop) throw new exeption.api.NotFound();
            const isFunction = typeof prop === 'function';
            if (isFunction) prop = { method: prop.bind(entity) };
            const result = { entity, endpoint: prop };
            return result;
        }
        throw new exeption.api.NotFound();
    }

    /**
     * todo: add after hooks processing.
     */
    async processHooks(payload, entity, endpoint: IEndpoint): Promise<void> {
        const chain = new Chain();
        const appHooks = this.appHooks?.prev ? this.appHooks.prev : [];
        const entityHooks = entity.hooks ? entity.hooks.prev : [];
        const endpointHooks = endpoint.hooks ? endpoint.hooks.prev : [];
        const hooks = [...appHooks, ...entityHooks, ...endpointHooks];
        chain.add(hooks);
        await chain.process(payload);
        chain.clear();
    }
}
