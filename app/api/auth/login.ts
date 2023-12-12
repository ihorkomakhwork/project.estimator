import { ILoginDTO } from '../../contract/idomain';

export default ({ authService, validationHooks, authSchema, client }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(authSchema.login)],
        },
        async method({ email, password }: ILoginDTO) {
            const { message, token } = await authService.login(email, password);
            client.set('token', token);
            client.send();
            return { message, code: 201 };
        },
    },
});
