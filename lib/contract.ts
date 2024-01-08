import type { IncomingMessage, ServerResponse, ParsedUrlQuery } from './node';

type TProtocol = 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp';
type TAccess = 'public' | 'private';

export interface FHook {
    (payload?: object): Promise<void | Error> | void | Error;
}

export interface IHooks {
    prev?: Array<FHook>;
    after?: Array<FHook>;
}

export interface IMethod<TPayload = any> {
    (payload?: TPayload, id?: number, params?: object): any;
}

export interface IEndpoint<TPayload = any> {
    method: IMethod<TPayload>;
    hooks?: IHooks;
    access?: TAccess;
}

export interface IEndpoints {
    [index: number]: IEndpoint;
}

export interface IConfig {
    app: {
        path: string;
        ext: string;
        protocol: TProtocol;
        port: number;
    };
    awilix: {
        autoLoading: {
            pathPattern: string;
        };
    };
    chache: {
        url: string;
    };
    db: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    auth: {
        secret: string;
    };
    log: {
        transport: {
            target: string;
        };
        options: {
            colorize: boolean;
        };
    };
}

// export interface IController {
//     access?: TAccess;
//     hooks?: IHooks;
//     read?: IEndpoint | IMethod;
//     replace?: IEndpoint | IMethod;
//     create?: IEndpoint | IMethod;
//     update?: IEndpoint | IMethod;
//     info?: IEndpoint | IMethod;
//     delete?: IEndpoint | IMethod;
//     [props: string]: any;
// }

export interface IApplication {
    config: IConfig;
    lib: object;
    npm: object;
    node: object;
    [props: string]: any;
}

export interface IServer {
    application: IApplication;
}

export type TSocket = string;
export type TProcedures = string[];
export type TPath = string;
export type TId = number | undefined;
export type TParams = ParsedUrlQuery | null;
export type TPayload = object | null;

export interface IClient {
    req: IncomingMessage;
    res: ServerResponse;
    host: string;
    cookie: object;
    preparedCookie: any[];
    cookieExpire: string;
    read: () => void;
    set: (name: string, val) => void;
    delete: (name: string) => void;
    send(): void;
}
export interface IData {
    id: TId;
    params: TParams;
    payload: TPayload;
}

export interface ICtx {
    client: IClient;
    procedures: TProcedures;
    path: TPath;
    data: IData;
    socket: TSocket;
}

export interface IReqHandler {
    (ctx: ICtx): any;
}

export interface ITransport {
    (port: number, handler: IReqHandler): any;
}

export interface ITransports {
    [props: string]: ITransport;
}

export type IArgs = [TPayload, TId, TParams];

export interface IArg {
    method: IMethod;
    name: string;
    candidate: TPayload | TId | TParams;
}

export interface IURL {
    path: string | null;
    id: number | undefined;
    params: ParsedUrlQuery | null;
}

export interface IRoute {
    entity: object; // Rewrite to IController
    endpoint: IEndpoint;
}