import type { ITask } from '../contract/idomain';
import IContainer from '../contract/icrontainer';

export default ({ repository, client }: IContainer) => ({
    log() {
        console.debug('client', client);
    },
    ...repository.model<ITask>('task'),
});
