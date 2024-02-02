import { ICreateUserDTO } from '../../contract/domain';

export default ({ lib, npm, config, usersEntity, cache, logger }) => ({
    async register(candidate: ICreateUserDTO): Promise<any> {
        const { email, password } = candidate;
        const exists = await usersEntity.readByEmail(email);
        if (exists) throw new lib.exeption.domain.AlreadyExists('User');
        const hash = await lib.security.hashPassword(password);
        const user = { ...candidate, password: hash };
        await usersEntity.create(user);
        return { message: 'User craeted successfully' };
    },
    async login(email: string, password: string) {
        const user = await usersEntity.readByEmail(email);
        logger.info(user);
        if (!user) throw new lib.exeption.domain.NotFound('User');
        const { password: hash, role } = user;
        const valid = await lib.security.verifyPassword(password, hash);
        if (!valid) throw new lib.exeption.api.Unauthorized('Wrong password');
        const token = npm.jwt.sign({ email, role }, config.auth.secret);
        await cache.set(token, email);
        return { token, message: 'User logged in successfully' };
    },

    async logout(token: string): Promise<any> {
        if (!token) {
            throw new lib.exeption.api.Unauthorized('Token is not defined');
        }
        await cache.del(token);
        return { message: 'User logged out successfully' };
    },

    async refresh(olderToken: string): Promise<any> {
        if (!olderToken) {
            throw new lib.exeption.api.Unauthorized('Token is not defined');
        }
        const valid = npm.jwt.verify(olderToken, config.auth.secret);
        if (!valid) throw new lib.exeption.api.Unauthorized('Wrong token');
        const { email, role } = npm.jwt.decode(olderToken);
        const exists = await usersEntity.readByEmail(email);
        if (!exists) throw new lib.exeption.domain.NotFound('User');
        const token = npm.jwt.sign({ email, role }, config.auth.secret);
        await cache.set(token, email);
        return { token, message: 'Token refreshed successfully' };
    },
});
