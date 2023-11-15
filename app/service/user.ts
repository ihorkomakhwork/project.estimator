import IUser from 'app/interface/user';

export default ({ storage, lib }) => ({
    create(user: IUser): string {
        const exists = storage.users.has(user.email);
        if (exists) throw new lib.error.domain.AlreadyExists('User');
        storage.users.set(user.email, user);
        return 'Registration was successful';
    },

    findById() {},

    update() {},
    delete() {},
});
