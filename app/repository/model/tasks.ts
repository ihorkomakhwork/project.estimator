import type { ITaskDAO } from '../../contract/domain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<ITaskDAO>('tasks'),
});
