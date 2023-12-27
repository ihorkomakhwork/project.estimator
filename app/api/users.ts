import IContainer from 'app/contract/icrontainer';

export default ({/*accessHook*/ client }: IContainer) => ({
    // hooks: {
    //     prev: [accessHook.resolveRoles(['admin'])],
    // },

    async create({ payload }) {
        return { payload };
    },
    async readByParams({ params }) {
        console.log(params);
        return { /* code: 200 , */ params };
    },
    async readById({ id }) {
        return { id };
    },
    async read() {
        console.log(client);
        return { read: true };
    },
});
