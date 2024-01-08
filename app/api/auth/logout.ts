export default ({ authService, client }) => ({
    async read() {
        const token = client.cookie['token'];
        const result = await authService.logout(token);
        delete client.cookie['token'];
        return { ...result };
    },
});
