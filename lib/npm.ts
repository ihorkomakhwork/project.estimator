import * as awilix from 'awilix';
import pg from 'pg';
import * as redis from 'redis';
import pino from 'pino';
import jwt from 'jsonwebtoken';

const npm = { awilix, pg, redis, pino, jwt };

Object.freeze(npm);

export type * from 'awilix';
export default npm;
