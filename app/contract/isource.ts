import ICRUD from './icrud';
import ITransaction from './itransaction';

export default interface ISource {
    crud: <TRecord>(table) => ICRUD<TRecord>;
    transact(
        sources: Array<ICRUD<any>>,
        callback: (trx: ITransaction) => Promise<void>,
    ): Promise<void>;
}
