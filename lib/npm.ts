import * as awilix from 'awilix';
import pg from 'pg';
import * as redis from 'redis';
import pino from 'pino';

const npm = { awilix, pg, redis, pino };

Object.freeze(npm);

export type * from 'awilix';
export default npm;
