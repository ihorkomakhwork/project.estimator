export default ({ authService, client }) => ({
    async read() {
        const oldToken = client.cookie['token'];
        const { message, token } = await authService.refresh(oldToken);
        client.set('token', token);
        client.send();
        return { message };
    },
});
