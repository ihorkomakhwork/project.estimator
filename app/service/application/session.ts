export default ({ client, cache, config }) => {
    const defaultProps = {
        key: 'token',
        expire: config.auth.expire,
    };
    const start = async (token, data, props = defaultProps) => {
        const { key, expire } = props;
        const session = JSON.stringify({ ...data, ...props });
        await cache.set(token, session);
        const expireInSec = expire * 60;
        await cache.expire(token, expireInSec);
        client.set(key, token, expire);
    };

    const destroy = async (key) => {
        const token = client.get(key);
        if (!token) return;
        await cache.del(token);
        client.delete(key);
    };

    const read = async (key) => {
        const token = client.get(key);
        if (token) {
            const record = await cache.get(token);
            if (!record) return null;
            const session = JSON.parse(record);
            return session;
        }
    };
    return { start, destroy, read };
};
