export default ({ authJWTService, client }) => ({
    async read() {
        const oldToken = client.cookie['token'];
        const { message, token } = await authJWTService.refresh(oldToken);
        client.set('token', token);
        client.send();
        return { message };
    },
});
