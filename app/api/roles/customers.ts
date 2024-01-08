export default ({
    accessHooks,
    validationHooks,
    customersSchema,
    customersEntity,
    lib,
}) => ({
    hooks: { prev: [accessHooks.allowRoles(['employee'])] },
    create: {
        hooks: {
            prev: [validationHooks.validate(customersSchema.createDTO)],
        },
        async method({ payload }) {
            const { password } = payload;
            const hash = await lib.security.hashPassword(password);
            await customersEntity.create({ ...payload, password: hash });
            return { message: 'Customer role created successfully', code: 201 };
        },
    },

    async readByParams({ params }) {
        const customers = await customersEntity.read(params);
        return { customers };
    },

    async readById({ id }) {
        const customer = await customersEntity.readById(id);
        if (!customer) throw new lib.exeption.domain.NotFound('Customer role');
        return { customer };
    },

    async read() {
        const customers = await customersEntity.read();
        return { customers };
    },

    updateById: {
        hooks: {
            prev: [validationHooks.validate(customersSchema.updateDTO)],
        },
        async method({ id, payload }) {
            await customersEntity.update(id, payload);
            return { message: 'Customer role updated successfully' };
        },
    },

    async deleteById({ id }) {
        await customersEntity.delete(id);
        return { message: 'Customer role deleted successfully' };
    },
});
