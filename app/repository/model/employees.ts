import { IEmployeeDAO } from '../../contract/domain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IEmployeeDAO>('employees'),
});
