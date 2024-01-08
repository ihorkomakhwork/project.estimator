export default ({
    accessHooks,
    validationHooks,
    employeesSchema,
    employeesEntity,
    lib,
}) => ({
    hooks: { prev: [accessHooks.allowRoles(['admin', 'employee'])] },
    create: {
        hooks: {
            prev: [validationHooks.validate(employeesSchema.createDTO)],
        },
        async method({ payload }) {
            const { password } = payload;
            const hash = await lib.security.hashPassword(password);
            await employeesEntity.create({ ...payload, password: hash });
            return { message: 'Employee role created successfully', code: 201 };
        },
    },

    async readByParams({ params }) {
        const employees = await employeesEntity.read(params);
        return { employees };
    },

    async readById({ id }) {
        const employee = await employeesEntity.readById(id);
        if (!employee) throw new lib.exeption.domain.NotFound('Employee role');
        return { employee };
    },

    async read() {
        const employees = await employeesEntity.read();
        return { employees };
    },

    updateById: {
        hooks: {
            prev: [validationHooks.validate(employeesSchema.updateDTO)],
        },
        async method({ id, payload }) {
            await employeesEntity.update(id, payload);
            return { message: 'Employee role updated successfully' };
        },
    },

    async deleteById({ id }) {
        await employeesEntity.delete(id);
        return { message: 'Employees role deleted successfully' };
    },
});
