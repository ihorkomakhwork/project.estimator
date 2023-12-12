export default ({ authService, client }) => ({
    read: {
        async method() {
            const oldToken = client.cookie['token'];
            console.log('oldToken', oldToken);
            const { message, token } = await authService.refresh(oldToken);
            client.set('token', token);
            client.send();
            return { message };
        },
    },
});
