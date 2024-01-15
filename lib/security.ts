import node from './node';

const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGIT = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGIT;

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

const generateToken = (tokenLength) => {
    const base = ALPHA_DIGIT.length;
    let key = '';
    for (let i = 0; i < tokenLength; i++) {
        const index = Math.floor(Math.random() * base);
        key += ALPHA_DIGIT[index];
    }
    return key;
};

export default { hashPassword, verifyPassword, generateToken };
