import { ICustomerDAO } from '../../contract/idomain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<ICustomerDAO>('customers'),
});
