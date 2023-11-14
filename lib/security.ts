import node from './node';

const base64 = (str: string): string => Buffer.from(str).toString('base64');

const sha256 = (str: string, salt: string): string => {
    const hash = node.crypto.createHmac('sha256', salt);
    hash.update(str);
    return hash.digest('hex');
};

class JWT {
    constructor(
        public headers = base64(
            JSON.stringify(headers || { alg: 'HS256', typ: 'JWT' }),
        ),
    ) {}

    sign(payload: object, secret: string) {
        const encrypetedPayload = base64(JSON.stringify(payload));
        const signature = sha256(
            `${this.headers}.${encrypetedPayload}`,
            secret,
        );
        return `${this.headers}.${encrypetedPayload}.${signature}`;
    }

    verify(token: string, secret: string) {
        const [headers, payload, clientSignature] = token.split('.');
        const encrypetedPayload = base64(JSON.stringify(payload));
        const testigSignature = sha256(
            `${headers}.${encrypetedPayload}`,
            secret,
        );
        return testigSignature === clientSignature;
    }

    decode(token: string) {
        const payload = token.split('.')[1];
        return JSON.parse(base64(payload));
    }
}

export default { base64, sha256, JWT };
