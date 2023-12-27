export default ({ lib, usersEntity, client, jwt, cache }) => ({
    async resolveRoles(roles: string[]) {
        debugger;
        const token = client.cookie['token'];
        const email = cache.get(token);
        const { role } = jwt.decode(token);
        const user = await usersEntity.read({ email, role });
        if (!user) throw new lib.exeption.api.Unauthorized();
        const allowed = roles.includes(role);
        if (!allowed) throw new lib.exeption.api.Forbidden();
    },
});
