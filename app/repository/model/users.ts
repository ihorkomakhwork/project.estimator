import type {
    IUserDAO,
    IUserDTO,
    ICustomer,
    IEmployee,
} from '../../contract/idomain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IUserDAO>('users'),
    async create(user: IUserDTO) {
        const users = repository.model<IUserDAO>('users');
        const employees = repository.model<IEmployee>('employees');
        const customers = repository.model<ICustomer>('customers');
        const { role } = user;
        const { type } = role;
        const callback = async (trx) => {
            await trx.users.create({ ...user, role: type });
            const [createdUser] = await trx.users.read({ email: user.email });
            if (user.role.type === 'customer') {
                const customer = {
                    userId: createdUser.id,
                    license: user.role.license,
                };
                await trx.customers.create(customer);
            } else if (user.role.type === 'employee') {
                const employee = {
                    userId: createdUser.id,
                    positionId: user.role.positionId,
                    sallary: user.role.sallary,
                };
                await trx.employees.create(employee);
            } else if (user.role.type === 'admin') return;
        };
        await repository.transact([employees, users, customers], callback);
    },
    async readByEmail(email: string) {
        const [user] = await repository.model<IUserDAO>('users').read({
            email,
        });
        return user;
    },
});
