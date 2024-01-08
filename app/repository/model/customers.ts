import { ICustomerDAO } from '../../contract/domain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<ICustomerDAO>('customers'),
});
