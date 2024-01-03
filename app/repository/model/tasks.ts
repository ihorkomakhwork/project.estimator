import type { ITask } from '../../contract/idomain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<ITask>('tasks'),
});
