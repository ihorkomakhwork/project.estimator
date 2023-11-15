import error from './error/error';
import transports from './transport';
import type {
    IApplication,
    IServer,
    FHook,
    IReq,
    IEntity,
    IEndpoint,
    IHooks,
    IReqArgs,
    IMethod,
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
    async process(payload) {
        const chain = [];
        for (const hook of this.hooks) {
            const pipe = hook(payload);
            chain.push(pipe);
        }
        Promise.all(chain);
    }
}

export default class Server implements IServer {
    constructor(
        public application: IApplication,
        public appHooks: IHooks = { prev: [], after: [] },
        private chain: Chain = new Chain(),
    ) {
        const { protocol, port } = application.config.app;
        const transport = transports[protocol];
        // const hasAppHooks = this.application.has('appHooks');
        // if (hasAppHooks) this.appHooks = this.application.appHooks;
        this.application.logger.info(
            `${protocol.toLocaleUpperCase()} Server listen port: ${port}`,
        );
        transport(port, this.reqHandler.bind(this));
    }

    async reqHandler(req: IReq) {
        try {
            const args = [];
            const data: IReqArgs = Object.values(req) as IReqArgs;
            const [client, socket, procedure, path, id, payload] = data;
            this.application.createContext({ client });
            this.application.logger.info(
                `====== socket: ${socket.remoteAddress}, path: ${path} procedure: ${procedure},id: ${id}, payload: '${payload} ====== `,
            );
            const entity = this.getEntity(path);
            const endpoint = this.getEndpoint(entity, procedure);
            if (payload) {
                args.push(payload);
                await this.preValidate(payload, entity, endpoint);
            }
            const hasId = this.hasMethodId(endpoint.method);
            if (hasId) args.push(id);
            const result = await endpoint.method(...args);
            this.application.logger.info('result', result);
            const code = result.code || 200;
            const message = result.message || 'Ok';
            if (!result.code) return { ...result, code, message };
            return result;
        } catch (error) {
            return this.application.errorFilter.global(error);
        }
    }

    hasMethodId(method: IMethod): boolean {
        const src = method.toString();
        const signature = src.substring(0, src.indexOf(')'));
        return signature.includes('id');
    }
    getEntity(path: string): IEntity {
        if (!this.application.has(path)) throw new error.api.NotFound();
        const entity: IEntity = this.application[path];
        return entity;
    }
    getEndpoint(entity: IEntity, method: string): IEndpoint {
        const endpoint = entity[method];
        if (!endpoint) throw new error.api.NotFound('Not Found', 404);
        const isFunction = typeof endpoint === 'function';
        if (isFunction) return { method: endpoint };
        return endpoint;
    }

    async preValidate(
        payload,
        entity: IEntity,
        endpoint: IEndpoint,
    ): Promise<void> {
        const appHooks = this.appHooks?.prev ? this.appHooks.prev : [];
        const entityHooks = entity.hooks ? entity.hooks.prev : [];
        const endpointHooks = endpoint.hooks ? endpoint.hooks.prev : [];
        const hooks = [...appHooks, ...entityHooks, ...endpointHooks];
        this.chain.add(hooks);
        await this.chain.process(payload);
        this.chain.clear();
    }
}
