import * as path from 'node:path';
import * as http from 'node:http';
import * as util from 'node:util';
import * as crypto from 'node:crypto';
import * as url from 'node:url';
import * as fsp from 'node:fs/promises';
import * as events from 'node:events';
import * as assert from 'node:assert';
import * as querystring from 'node:querystring';
import * as os from 'node:os';

const node = {
    process,
    path,
    http,
    util,
    crypto,
    fsp,
    url,
    events,
    assert,
    querystring,
    os,
};

Object.freeze(node);

export default node;
export type { Socket } from 'node:net';
export type { IncomingMessage, ServerResponse } from 'node:http';
export type { ParsedUrlQuery } from 'node:querystring';
