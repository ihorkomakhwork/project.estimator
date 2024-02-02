export default ({ authLocalService, client }) => ({
    async read() {
        const token = client.get('token');
        const result = await authLocalService.restore(token);
        client.send();
        return { ...result };
    },
});
