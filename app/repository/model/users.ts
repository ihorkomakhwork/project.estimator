import type {
    IUserDAO,
    ICreateUserDTO,
    ICustomerDAO,
    IEmployeeDAO,
} from '../../contract/domain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IUserDAO>('users'),
    async create(user: ICreateUserDTO) {
        const users = repository.model<IUserDAO>('users');
        const employees = repository.model<IEmployeeDAO>('employees');
        const customers = repository.model<ICustomerDAO>('customers');
        const callback = async (trx) => {
            await trx.users.create({ ...user, role: user.role.type });
            const [createdUser] = await trx.users.read({ email: user.email });
            if (user.role.type === 'customer') {
                const customer = {
                    userId: createdUser.id,
                    license: user.role.license,
                    iban: user.role.iban,
                };
                await trx.customers.create(customer);
            } else if (user.role.type === 'employee') {
                const employee = {
                    userId: createdUser.id,
                    positionId: user.role.positionId,
                    salary: user.role.salary,
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
