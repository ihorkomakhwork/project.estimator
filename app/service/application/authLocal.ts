export default ({ lib, sessionService, usersEntity, logger, config }) => {
    const { exeption, security } = lib;
    const sessionOptions = {
        expire: config.auth.expire,
        key: config.auth.sessionKey,
    };
    const register = async (candidate) => {
        const { email, password, role } = candidate;
        const exists = await usersEntity.readByEmail(email);
        if (exists) throw exeption.domain.AlreadyExists('User');
        const hash = await security.hashPassword(password);
        const user = { ...candidate, password: hash };
        await usersEntity.create(user);
        const token = security.generateToken(config.auth.tokenLength);
        const data = { email, role };
        await sessionService.start(token, data, sessionOptions);
        return { message: 'User craeted successfully' };
    };

    const login = async (email, password) => {
        const user = await usersEntity.readByEmail(email);
        if (!user) throw exeption.domain.NotFound('User');
        const { password: hash, role } = user;
        const valid = await security.verifyPassword(password, hash);
        if (!valid) throw exeption.api.Unauthorized('Wrong password');
        logger.info(`Logged user: ${login}`);
        const token = security.generateToken(config.auth.tokenLength);
        const data = { email, role };
        await sessionService.start(token, data, sessionOptions);
        return { message: 'User logged in successfully' };
    };

    const logout = async () => {
        await sessionService.destroy(config.auth.sessionKey);
        return { message: 'User logged out successfully' };
    };

    return {
        register,
        login,
        logout,
    };
};
