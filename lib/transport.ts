import node from './node';
import type { IReqHandler, ITransports, TPayload } from './contract';
import util from './util/util';
import Client from './client';

const transports: ITransports = {
    http: (port: number, handler: IReqHandler) =>
        node.http
            .createServer(async (req, res) => {
                const { method, url, socket } = req;
                const host = node.os.hostname();
                const client = new Client(req, res);
                const procedure = util.http.CRUD[method.toLowerCase()];
                const entireURL = `http://${host}:${port}${url}`;
                const pathObj = util.http.parseUrl(entireURL);
                const contentLength = req.headers['content-length'];
                const contentType = req.headers['content-type'];
                let payload: TPayload = null;
                const hasPayload = contentLength && contentType;
                if (hasPayload) payload = await util.http.receiveArgs(req);
                const channel = {
                    client,
                    procedure,
                    ...pathObj,
                    payload,
                    socket: socket.remoteAddress,
                };
                const result = await handler(channel);
                res.writeHead(result.code, util.http.HEADERS);
                res.end(JSON.stringify(result));
            })
            .listen(port),
};

export default transports;
