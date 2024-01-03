import type { IParticipant } from '../../contract/idomain';
import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    ...repository.model<IParticipant>('participants'),
});
