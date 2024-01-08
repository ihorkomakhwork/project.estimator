import IContainer from '../../contract/icrontainer';

export default ({
    accessHooks,
    validationHooks,
    estimationsEntity,
    estimationsSchema,
}: IContainer) => ({
    hooks: {
        prev: [accessHooks.allowRoles(['employee'])],
    },

    create: {
        hooks: {
            prev: [
                validationHooks.validate(estimationsSchema.createDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ payload }) {
            await estimationsEntity.create(payload);
            return {
                message: 'Estimations created successfully',
                status: 201,
            };
        },
    },

    async readByParams({ params }) {
        const users = await estimationsEntity.read(params);
        return { users };
    },

    async readById({ id }) {
        return await estimationsEntity.readById(id);
    },

    async read() {
        const users = await estimationsEntity.read();
        return { users };
    },

    updateById: {
        hooks: {
            prev: [
                validationHooks.validate(estimationsSchema.updateDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ id, payload }) {
            await estimationsEntity.update(id, payload);
            return { message: 'Estimations updated successfully' };
        },
    },

    deleteById: {
        hooks: {
            prev: [accessHooks.allowPositionAreas(['manager'])],
        },
        async method({ id }) {
            await estimationsEntity.delete(id);
            return { message: 'Estimations deleted successfully' };
        },
    },
});
