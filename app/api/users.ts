import IContainer from 'app/contract/icrontainer';

export default ({
    accessHooks,
    validationHooks,
    usersSchema,
    usersEntity,
}: IContainer) => ({
    hooks: { prev: [accessHooks.allowRoles(['admin'])] },
    create: {
        hooks: {
            prev: [validationHooks.validate(usersSchema.createDTO)],
        },
        async method({ payload }) {
            await usersEntity.create(payload);
            return { message: 'User created successfully', status: 201 };
        },
    },

    async readByParams({ params }) {
        const users = await usersEntity.read(params);
        return { users };
    },

    async readById({ id }) {
        return await usersEntity.readById(id);
    },

    async read() {
        const users = await usersEntity.read();
        return { users };
    },

    updateById: {
        hooks: {
            prev: [validationHooks.validate(usersSchema.updateDTO)],
        },
        async method({ id, payload }) {
            await usersEntity.update(id, payload);
            return { message: 'User updated successfully' };
        },
    },

    async deleteById({ id }) {
        await usersEntity.delete(id);
        return { message: 'User deleted successfully' };
    },
});
