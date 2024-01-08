import IContainer from '../contract/icrontainer';

export default ({
    accessHooks,
    validationHooks,
    participantsEntity,
    participantsSchema,
}: IContainer) => ({
    hooks: {
        prev: [accessHooks.allowRoles(['admin', 'employee'])],
    },

    create: {
        hooks: {
            prev: [
                validationHooks.validate(participantsSchema.createDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ payload }) {
            await participantsEntity.create(payload);
            return {
                message: 'Participants created successfully',
                status: 201,
            };
        },
    },

    async readByParams({ params }) {
        const participants = await participantsEntity.read(params);
        return { participants };
    },

    async readById({ id }) {
        return await participantsEntity.readById(id);
    },

    async read() {
        const participants = await participantsEntity.read();
        return { participants };
    },

    updateById: {
        hooks: {
            prev: [
                validationHooks.validate(participantsSchema.updateDTO),
                accessHooks.allowPositionAreas(['manager']),
            ],
        },
        async method({ id, payload }) {
            await participantsEntity.update(id, payload);
            return { message: 'Participants updated successfully' };
        },
    },

    deleteById: {
        hooks: {
            prev: [accessHooks.allowPositionAreas(['manager'])],
        },
        async method({ id }) {
            await participantsEntity.delete(id);
            return { message: 'Participants deleted successfully' };
        },
    },
});
