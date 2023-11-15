import * as path from 'node:path';
import * as http from 'node:http';
import * as util from 'node:util';
import * as crypto from 'node:crypto';
import * as url from 'node:url';
import * as fsp from 'node:fs/promises';
import * as events from 'node:events';

const node = { process, path, http, util, crypto, fsp, url, events };

Object.freeze(node);

export default node;
export type { Socket } from 'node:net';
export type { IncomingMessage, ServerResponse } from 'node:http';
