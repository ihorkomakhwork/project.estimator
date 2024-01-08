import type { IPositionDAO } from '../../contract/idomain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IPositionDAO>('positions'),
});
