import IContainer from 'app/contract/icrontainer';
import ISource from '../contract/icrud';
import IMapper from '../contract/imapper';

export default ({ source, dalErrorFilter }: IContainer): IMapper => ({
    serialization: {
        read: ({ rows }) => rows.map((row) => ({ ...row })),
        readOne: ({ rows }) => rows[0],
        create: ({ rows }) => rows,
        update: ({ rows }) => rows,
        delete: ({ rows }) => rows,
    },
    async apply(target, thisArg, args): Promise<object> {
        try {
            const serialize = this.serialization[target.name];
            const result = await Reflect.apply(target, thisArg, args);
            return serialize(result);
        } catch (error) {
            dalErrorFilter(error);
        }
    },
    get(target, name, receiver): object {
        const toSerialize = this.serialization.hasOwnProperty(name);
        const result = Reflect.get(target, name, receiver);
        if (toSerialize)
            return new Proxy(result, { apply: this.apply.bind(this) });
        return result;
    },
    model<TEntity>(name: string): ISource<TEntity> {
        const entity = source.crud<TEntity>(name);
        return new Proxy(entity, { get: this.get.bind(this) });
    },
    transact: source.transact,
});
