import ICRUD from './icrud';

export default interface ITransaction {
    [key: string]: ICRUD<any>;
}
