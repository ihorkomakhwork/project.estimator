import type { IURL } from '../contract';

const CRUD = {
    get: 'read',
    put: 'replace',
    post: 'create',
    patch: 'update',
    options: 'info',
    delete: 'delete',
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

const parseUrl = (url: string): IURL => {
    const dirs = url.split('/').filter((part) => part !== '');
    const isId = url.indexOf(':') !== -1;
    if (isId) {
        const id = dirs.pop().replace(':', '');
        return { path: dirs.join('/'), id };
    }
    return { path: dirs.join('/'), id: undefined };
};

export default {
    CRUD,
    MIME_TYPES,
    HEADERS,
    receiveArgs,
    parseUrl,
};
