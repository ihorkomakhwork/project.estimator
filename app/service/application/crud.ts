import IContainer from '../../contract/icrontainer';

export default ({ repository }: IContainer) => ({
    generate<TEntity>(entity: string) {
        return {
            ...repository.model<TEntity>(entity),
        };
    },
});
