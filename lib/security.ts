import node from './node';

const scryptPromise = node.util.promisify(node.crypto.scrypt);

const hashPassword = async (password: string) => {
    const salt = node.crypto.randomBytes(8).toString('hex');
    const derivedKey = await scryptPromise(password, salt, 32);
    return salt + ':' + (derivedKey as Buffer).toString('hex');
};

const verifyPassword = async (password: string, hash: string) => {
    const [salt, key] = hash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = await scryptPromise(password, salt, 32);
    return node.crypto.timingSafeEqual(keyBuffer, derivedKey as Buffer);
};

export default { hashPassword, verifyPassword };
