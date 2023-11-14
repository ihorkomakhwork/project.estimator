import { IncomingMessage, ServerResponse } from 'http';
import { IClient } from './contract';

const parseHost = (host) => {
    if (!host) return 'no-host-name-in-http-headers';
    const portOffset = host.indexOf(':');
    if (portOffset > -1) host = host.substr(0, portOffset);
    return host;
};

const calculateExpiringUTC = (timeInMilliseconds) => {
    const currentDate = new Date();
    const expireDate = new Date(currentDate.getTime() + timeInMilliseconds);
    const formattedExpireDate = expireDate.toUTCString();
    return formattedExpireDate;
};

export default class Client implements IClient {
    static UNIX_EPOCH: string = 'Thu, 01 Jan 1970 00:00:00 GMT';
    static COOKIE_DELETE: string = `=deleted; Expires=${Client.UNIX_EPOCH}; Path=/; Domain=`;
    constructor(
        public req: IncomingMessage,
        public res: ServerResponse,
        public expire: number = 1000 * 60 * 60 * 24 * 30,
        public host: string = parseHost(req.headers.host),
        public cookie: object = {},
        public preparedCookie: any[] = [],
        public cookieExpire: string = calculateExpiringUTC(expire),
    ) {
        this.read();
    }
    read(): void {
        const { req } = this;
        const { cookie } = req.headers;
        if (!cookie) return;
        const items = cookie.split(';');
        for (const item of items) {
            const parts = item.split('=');
            const key = parts[0].trim();
            const val = parts[1] || '';
            this.cookie[key] = val.trim();
        }
    }

    set(name: string, val): void {
        const { host } = this;
        const expires = `expires=${this.cookieExpire}`;
        const cookie = `${name}=${val}; ${expires}; Path=/; Domain=${host}; HttpOnly`;
        this.preparedCookie.push(cookie);
    }

    delete(name: string): void {
        this.preparedCookie.push(name + Client.COOKIE_DELETE + this.host);
    }

    send(): void {
        const { res, preparedCookie } = this;
        if (preparedCookie.length && !res.headersSent) {
            res.setHeader('Set-Cookie', preparedCookie);
        }
    }
}
