export default ({ lib, usersEntity, positionsEntity, client, npm, cache }) => ({
    allowRoles(roles: string[]) {
        return async () => {
            const token = client.cookie['token'];
            const email = await cache.get(token);
            if (!email) throw new lib.exeption.api.Unauthorized();
            const { role } = npm.jwt.decode(token);
            const users = await usersEntity.read({ email, role });
            if (!users.length) throw new lib.exeption.api.Unauthorized();
            const allowed = roles.includes(role);
            if (!allowed) throw new lib.exeption.api.Forbidden();
        };
    },
    allowPositionType(types: string[]) {
        return async () => {
            const token = client.cookie['token'];
            const email = await cache.get(token);
            if (!email) throw new lib.exeption.api.Unauthorized();
            const { id } = await usersEntity.readByEmail(email);
            const { type } = await positionsEntity.read({ userId: id });
            const allowed = types.includes(type);
            if (!allowed) throw new lib.exeption.api.Forbidden();
        };
    },
});
