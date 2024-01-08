export default ({ estimationsEntity }) => ({
    create: async (estimation) => await estimationsEntity.create(estimation),
    readByParams: async (params) => await estimationsEntity.read(params),
    readById: async (id) => await estimationsEntity.readById(id),
    read: async () => await estimationsEntity.read(),
    updateById: async (id, estimation) => {
        await estimationsEntity.update(id, estimation);
    },
    deleteById: async (id) => await estimationsEntity.delete(id),
});
