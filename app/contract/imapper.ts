import FMapper from './fmapper';
import ICRUD from './icrud';
import ITransaction from './itransaction';

export default interface IMapper {
    serialization: {
        read: (result) => object;
        readById: (rows) => object;
        create: (rows) => object;
        update: (rows) => object;
        delete: (rows) => object;
    };
    apply(target, thisArg, args): Promise<object>;
    get(target, name, receiver): object;
    model: FMapper;
    transact: (
        sources: Array<ICRUD<any>>,
        callback: (trx: ITransaction) => Promise<void>,
    ) => Promise<void>;
}
