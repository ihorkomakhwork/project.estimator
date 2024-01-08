import { ILoginDTO } from '../../contract/domain';

export default ({ authService, validationHooks, authSchema, client }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(authSchema.login)],
        },
        async method({ payload }) {
            const { email, password } = payload as ILoginDTO;
            const { message, token } = await authService.login(email, password);
            client.set('token', token);
            client.send();
            return { message, code: 201 };
        },
    },
});
