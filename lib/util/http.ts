import { IURL } from 'lib/contract';
import node from '../node';

const CRUD = {
    get: ['readById', 'read', 'readByParams'],
    put: ['replace'],
    post: ['create'],
    patch: ['updateById', 'update', 'updateByParams'],
    delete: ['deleteById', 'delete', 'deleteByParams'],
};

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    json: 'application/json; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};

const HEADERS = {
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const receiveArgs = async (req) => {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    if (!buffers.length) return null;
    const data = Buffer.concat(buffers).toString();
    return JSON.parse(data);
};

const isEmptyObject = (obj: object) => !Object.keys(obj).length;

const deleteChar = (str: string, char: string) => str.replace(char, '');

const pathGetId = (pathname: string): number | undefined => {
    const entities = pathname.split('/');
    const idIndex = entities.length - 1;
    const lastEntity = entities[idIndex];
    const id = parseInt(lastEntity, 10);
    const isId = !isNaN(id);
    if (isId) return id;
    return;
};

const cutSlash = (str: string): string => {
    const firs = str[0];
    const last = str[str.length - 1];
    if (firs === '/') str = str.slice(1);
    if (last === '/') str = str.slice(0, -1);
    return str;
};

//TO REFACTORING
const parseUrl = (url: string): IURL => {
    const { pathname, search } = new node.url.URL(url);
    let path = cutSlash(pathname);
    const queryStr = search.slice(1);
    let params = node.querystring.parse(queryStr);
    if (isEmptyObject(params)) params = null;
    const id = pathGetId(path);
    if (id) path = deleteChar(path, `/${id}`);
    return { path, id, params };
};

export default {
    CRUD,
    MIME_TYPES,
    HEADERS,
    receiveArgs,
    parseUrl,
};
