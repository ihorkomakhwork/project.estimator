export default ({
    lib,
    usersEntity,
    employeesEntity,
    positionsEntity,
    client,
    npm,
    cache,
}) => ({
    allowRoles(roles: string[]) {
        return async () => {
            const token = client.get('token');
            const email = await cache.get(token);
            if (!email) throw new lib.exeption.api.Unauthorized();
            const { role } = npm.jwt.decode(token);
            const users = await usersEntity.read({ email, role });
            if (!users.length) throw new lib.exeption.api.Unauthorized();
            const allowed = roles.includes(role);
            if (!allowed) throw new lib.exeption.api.Forbidden();
        };
    },
    allowPositionAreas(areas: string[]) {
        return async () => {
            const token = client.get('token');
            const email = await cache.get(token);
            if (!email) throw new lib.exeption.api.Unauthorized();
            const user = await usersEntity.readByEmail(email);
            const isEmployee = user.role === 'employee';
            const valid = user && isEmployee;
            if (!valid) throw new lib.exeption.api.Forbidden();
            const { positionId } = await employeesEntity.read({
                userId: user.id,
            });
            const position = await positionsEntity.readById(positionId);
            const allowed = areas.includes(position.area);
            if (!allowed) throw new lib.exeption.api.Forbidden();
        };
    },
});
