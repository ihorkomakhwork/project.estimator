import ISource from './icrud';

export default interface FMapper {
    <TEntity>(repo: string): ISource<TEntity>;
}
