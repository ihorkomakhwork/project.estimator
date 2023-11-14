import IUser from 'app/interface/user';

export default ({ userService }) => ({
    register(user: IUser) {
        const message = userService.create(user);
        return message;
    },
    login() {
        throw new Error('Not implemented');
    },

    logout() {
        throw new Error('Not implemented');
    },

    refresh() {
        throw new Error('Not implemented');
    },
});
