import util from './util/util';
import { IncomingMessage, ServerResponse } from 'http';
import { IClient } from './contract';

export default class Client implements IClient {
    static UNIX_EPOCH: string = 'Thu, 01 Jan 1970 00:00:00 GMT';
    static COOKIE_DELETE: string = `=deleted; Expires=${Client.UNIX_EPOCH}; Path=/; Domain=`;
    constructor(
        public req: IncomingMessage,
        public res: ServerResponse,
        public host: string = util.http.parseHost(req.headers.host),
        public cookie: Map<string, string> = new Map(),
        public preparedCookie: any[] = [],
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
            this.cookie.set(key, val.trim());
        }
    }

    get(name: string): any {
        return this.cookie.get(name);
    }

    set(name: string, val, expire: number): void {
        const { host } = this;
        const cookieExpire = util.common.calculateExpiringUTC(expire);
        const expires = `expires=${cookieExpire}`;
        const cookie = `${name}=${val}; ${expires}; Path=/; Domain=${host}; HttpOnly`;
        this.preparedCookie.push(cookie);
    }

    delete(name: string): void {
        this.preparedCookie.push(name + Client.COOKIE_DELETE + this.host);
        this.cookie.delete(name);
    }

    send(): void {
        const { res, preparedCookie } = this;
        if (preparedCookie.length && !res.headersSent) {
            res.setHeader('Set-Cookie', preparedCookie);
        }
    }
}
