import IContainer from '../contract/icrontainer';

export default ({
    accessHooks,
    validationHooks,
    proposalsEntity,
    proposalsSchema,
}: IContainer) => ({
    create: {
        hooks: {
            prev: [
                validationHooks.validate(proposalsSchema.createDTO),
                accessHooks.allowRoles(['customer']),
            ],
        },
        async method({ payload }) {
            await proposalsEntity.create(payload);
            return { message: 'Proposal created successfully', status: 201 };
        },
    },

    async readByParams({ params }) {
        const users = await proposalsEntity.read(params);
        return { users };
    },

    async readById({ id }) {
        return await proposalsEntity.readById(id);
    },

    async read() {
        const users = await proposalsEntity.read();
        return { users };
    },

    updateById: {
        hooks: {
            prev: [validationHooks.validate(proposalsSchema.updateDTO)],
        },
        async method({ id, payload }) {
            await proposalsEntity.update(id, payload);
            return { message: 'Proposal updated successfully' };
        },
    },

    deleteById: {
        async method({ id }) {
            await proposalsEntity.delete(id);
            return { message: 'Proposal deleted successfully' };
        },
    },
});
