import type { IEstimationDAO } from '../../contract/domain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IEstimationDAO>('projectsEstimations'),
});
