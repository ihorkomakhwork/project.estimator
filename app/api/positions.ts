import IContainer from '../contract/icrontainer';

export default ({
    validationHooks,
    accessHooks,
    positionsSchema,
    positionsEntity,
}: IContainer) => ({
    hooks: {
        prev: [accessHooks.allowRoles(['admin', 'employee'])],
    },
    create: {
        hooks: {
            prev: [
                validationHooks.validate(positionsSchema.createDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ payload }) {
            await positionsEntity.create(payload);
            return { message: 'Positions created successfully', status: 201 };
        },
    },

    async readByParams({ params }) {
        const positions = await positionsEntity.read(params);
        return { positions };
    },

    async readById({ id }) {
        return await positionsEntity.readById(id);
    },

    async read() {
        const positions = await positionsEntity.read();
        return { positions };
    },

    updateById: {
        hooks: {
            prev: [
                accessHooks.allowPositionAreas(['manager']),
                validationHooks.validate(positionsSchema.updateDTO),
            ],
        },
        async method({ id, payload }) {
            await positionsEntity.update(id, payload);
            return { message: 'Positions updated successfully' };
        },
    },

    deleteById: {
        hooks: {
            prev: [accessHooks.allowPositionAreas(['manager'])],
        },
        async method({ id }) {
            await positionsEntity.delete(id);
            return { message: 'Positions deleted successfully' };
        },
    },
});
