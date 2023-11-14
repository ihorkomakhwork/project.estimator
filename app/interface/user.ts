export default interface IUser {
    name: string;
    lastName: string;
    middleName?: string;
    password: string;
    email: string;
    country: string;
    city: string;
    address: string;
    role: {
        type: 'customer' | 'admin' | 'employee';
        iban: string;
        license: 'PE' | 'LE';
    };
}
