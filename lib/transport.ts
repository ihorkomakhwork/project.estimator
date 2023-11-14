import node from './node';
import type { IReqHandler, ITransports, TPayload } from './contract';
import util from './util/util';
import Client from './client';

const transports: ITransports = {
    http: (port: number, handler: IReqHandler) =>
        node.http
            .createServer(async (req, res) => {
                const { method, url, socket } = req;
                const client = new Client(req, res);
                const procedure = util.http.CRUD[method.toLowerCase()];
                const path = util.http.parseUrl(url);
                const contentLength = req.headers['content-length'];
                const contentType = req.headers['content-type'];
                let payload: TPayload = null;
                if (contentLength && contentType)
                    payload = await util.http.receiveArgs(req);
                const ctx: any = {
                    client,
                    socket,
                    procedure,
                    ...path,
                    payload,
                };
                const result = await handler(ctx);
                res.writeHead(result.code, util.http.HEADERS);
                res.end(JSON.stringify(result));
            })
            .listen(port),
};

export default transports;
