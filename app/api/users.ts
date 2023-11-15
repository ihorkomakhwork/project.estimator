export default ({ userModel }) => ({
    read(payload) {
        const users = userModel.read(payload);
        return { users };
    },
});
