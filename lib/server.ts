import exeption from './exeption/exeption';
import transports from './transport';
import type {
    IApplication,
    IServer,
    FHook,
    IEndpoint,
    IHooks,
    IMethod,
    ICtx,
    IChannel,
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
        console.log(chain);
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
        transport(port, this.request.bind(this));
        const message = `${protocol.toUpperCase()} Server listen port: ${port}`;
        this.application.logger.info(message);
    }

    async request(channel: IChannel) {
        try {
            const { socket, client, procedure, path } = channel;
            const { id, params, payload } = channel;
            this.application.createContext({ client });
            this.application.logger.info({ procedure, path, socket }, 'Req =>');
            const entity = this.getEntity(path);
            const endpoint = this.getEndpoint(entity, procedure);
            if (payload) await this.processPrevHooks(payload, entity, endpoint);
            const content = { id, params, payload };
            const ctx = await this.validate(endpoint.method, content);
            const result = await endpoint.method.call(entity, ctx);
            const { code = 200, message = 'Ok' } = result;
            this.application.logger.info({ result, code, message }, 'Res =>');
            return { ...result, code, message };
        } catch (error) {
            return this.application.globalErrorFilter(error);
        }
    }

    async validate(method: IMethod, ctx: ICtx): Promise<ICtx> {
        for (const fieldName in ctx) {
            const candidate = ctx[fieldName];
            const hasArg = this.hasMethodField(method, fieldName);
            const valid = (hasArg && candidate) || (!hasArg && !candidate);
            if (!valid) {
                const message = `Id, params, payload are defing by destructuring 
                in method signature like this: method({id, params, payload})`;
                this.application.logger.warn(message);
                throw new exeption.api.BadRequest(`${fieldName} is unvalid!`);
            }
        }
        return ctx;
    }

    getEntity(path: string) /* : IController */ {
        if (!this.application.has(path)) throw new exeption.api.NotFound();
        const entity /* : IController */ = this.application[path];
        return entity;
    }
    getEndpoint(entity /* : IController */, method: string): IEndpoint {
        const endpoint = entity[method];
        if (!endpoint) throw new exeption.api.NotFound('Not Found', 404);
        const isFunction = typeof endpoint === 'function';
        if (isFunction) return { method: endpoint };
        return endpoint;
    }
    hasMethodField(method: IMethod, arg: string): boolean {
        const src = method.toString();
        const signature = src.substring(0, src.indexOf(')'));
        const include = signature.includes(arg);
        return include;
    }
    async processPrevHooks(
        payload,
        entity /*: IController*/,
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
