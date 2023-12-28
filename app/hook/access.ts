export default ({ lib, usersEntity, client, npm, cache }) => ({
    resolve(roles: string[]) {
        return async () => {
            const token = client.cookie['token'];
            const email = await cache.get(token);
            if (!email) throw new lib.exeption.api.Unauthorized();
            const { role } = npm.jwt.decode(token);
            console.log(email, role);
            const users = await usersEntity.read({ email, role });
            if (!users.length) throw new lib.exeption.api.Unauthorized();
            const allowed = roles.includes(role);
            if (!allowed) throw new lib.exeption.api.Forbidden();
            debugger;
        };
    },
});
