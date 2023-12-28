import IContainer from 'app/contract/icrontainer';
import { IUserDAO } from 'app/contract/idomain';
export default ({ accessHooks, repository }: IContainer) => ({
    model: repository.model<IUserDAO>('users'),
    hooks: { prev: [accessHooks.resolve(['admin'])] },
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
        return { read: true };
    },
});
