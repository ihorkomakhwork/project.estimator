import type { Socket, IncomingMessage, ServerResponse } from './node';

type TProtocol = 'http' | 'https' | 'ws' | 'wss' | 'tcp' | 'udp';
type TAuthStrategy = 'jwt' | 'session';
type TAccess = 'public' | 'private';

export interface FHook {
    (payload?: object): Promise<void | Error> | void | Error;
}

export interface IHooks {
    prev?: Array<FHook>;
    after?: Array<FHook>;
}

export interface IMethod {
    (payload?: object, id?: number): any;
}

export interface IEndpoint {
    method: IMethod;
    hooks?: IHooks;
    access?: TAccess;
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
    auth: {
        strategy: TAuthStrategy;
        secret: string;
        tokens: {
            access: {
                expiresIn: '1m';
            };
            refresh: {
                expiresIn: '1h';
            };
        };
    };
    db: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
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

export interface IEntity {
    access?: TAccess;
    hooks?: IHooks;
    read?: IEndpoint | IMethod;
    replace?: IEndpoint | IMethod;
    create?: IEndpoint | IMethod;
    update?: IEndpoint | IMethod;
    info?: IEndpoint | IMethod;
    delete?: IEndpoint | IMethod;
}

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

export type TSocket = Socket;
export type TProcedure = string;
export type TPath = string;
export type TId = number | undefined;
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
export interface IReq {
    client: IClient;
    socket: TSocket;
    procedure: TProcedure;
    path: TPath;
    id?: TId;
    payload?: TPayload;
}

export type IReqArgs = [IClient, TSocket, TProcedure, TPath, TId, TPayload];

export interface IReqHandler {
    (req: IReq): any;
}

export interface ITransport {
    (port: number, handler: IReqHandler): any;
}

export interface ITransports {
    [props: string]: ITransport;
}

export interface IURL {
    path: string;
    id?: string;
}
