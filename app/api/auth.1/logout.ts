export default ({ authJWTService, client }) => ({
    async read() {
        const token = client.cookie['token'];
        const result = await authJWTService.logout(token);
        delete client.cookie['token'];
        return { ...result };
    },
});
