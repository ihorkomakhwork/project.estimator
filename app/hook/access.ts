export default ({
    lib,
    usersEntity,
    employeesEntity,
    positionsEntity,
    sessionService,
    config,
}) => {
    const allowRoles = (roles: string[]) => async () => {
        const session = await sessionService.read(config.auth.sessionKey);
        if (!session) throw new lib.exeption.api.Unauthorized();
        const { role } = session;
        const allowed = roles.includes(role);
        if (!allowed) throw new lib.exeption.api.Forbidden();
    };

    const allowPositionAreas = (areas: string[]) => async () => {
        const session = await sessionService.read(config.auth.sessionKey);
        const { email, role } = session;
        if (!email) throw new lib.exeption.api.Unauthorized();
        const isEmployee = role === 'employee';
        const user = await usersEntity.readByEmail(email);
        const valid = user && isEmployee;
        if (!valid) throw new lib.exeption.api.Forbidden();
        const { positionId } = await employeesEntity.read({
            userId: user.id,
        });
        const position = await positionsEntity.readById(positionId);
        const allowed = areas.includes(position.area);
        if (!allowed) throw new lib.exeption.api.Forbidden();
    };

    return { allowRoles, allowPositionAreas };
};
