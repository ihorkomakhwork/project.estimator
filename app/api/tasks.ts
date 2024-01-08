import IContainer from 'app/contract/icrontainer';

export default ({
    accessHooks,
    validationHooks,
    tasksEntity,
    tasksSchema,
}: IContainer) => ({
    hooks: {
        prev: [accessHooks.allowRoles(['employee'])],
    },
    create: {
        hooks: {
            prev: [
                validationHooks.validate(tasksSchema.createDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ payload }) {
            await tasksEntity.create(payload);
            return { message: 'Tasks created successfully', status: 201 };
        },
    },

    async readByParams({ params }) {
        const tasks = await tasksEntity.read(params);
        return { tasks };
    },

    async readById({ id }) {
        return await tasksEntity.readById(id);
    },

    async read() {
        const tasks = await tasksEntity.read();
        return { tasks };
    },

    updateById: {
        hooks: {
            prev: [
                validationHooks.validate(tasksSchema.updateDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ id, payload }) {
            await tasksEntity.update(id, payload);
            return { message: 'Tasks updated successfully' };
        },
    },

    deleteById: {
        prev: [accessHooks.allowPositionAreas(['manager'])],
        async method({ id }) {
            await tasksEntity.delete(id);
            return { message: 'Tasks deleted successfully' };
        },
    },
});
