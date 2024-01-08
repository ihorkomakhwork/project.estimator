export default ({
    accessHooks,
    validationHooks,
    usersSchema,
    usersEntity,
    lib,
}) => ({
    hooks: { prev: [accessHooks.allowRoles(['admin', 'employee'])] },
    create: {
        hooks: {
            prev: [
                accessHooks.allowRoles(['admin']),
                validationHooks.validate(usersSchema.createDTO),
            ],
        },
        async method({ payload }) {
            const { password } = payload;
            const hash = await lib.security.hashPassword(password);
            await usersEntity.create({ ...payload, password: hash });
            return { message: 'User created successfully', code: 201 };
        },
    },

    async readByParams({ params }) {
        const users = await usersEntity.read(params);
        return { users };
    },

    async readById({ id }) {
        const user = await usersEntity.readById(id);
        if (!user) throw new lib.exeption.domain.NotFound('User');
        return { user };
    },

    async read() {
        const users = await usersEntity.read();
        return { users };
    },

    updateById: {
        hooks: {
            prev: [
                validationHooks.validate(usersSchema.updateDTO),
                accessHooks.allowRoles(['admin']),
            ],
        },
        async method({ id, payload }) {
            await usersEntity.update(id, payload);
            return { message: 'User updated successfully' };
        },
    },

    deleteById: {
        hooks: {
            prev: [accessHooks.allowRoles(['admin'])],
        },
        async method({ id }) {
            await usersEntity.delete(id);
            return { message: 'User deleted successfully' };
        },
    },
});
