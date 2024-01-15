import { ILoginDTO } from '../../contract/domain';

export default ({ authJWTService, validationHooks, authSchema, client }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(authSchema.login)],
        },
        async method({ payload }) {
            const { email, password } = payload as ILoginDTO;
            const result = await authJWTService.login(email, password);
            const { token, message } = result;
            client.set('token', token);
            client.send();
            return { message, code: 201 };
        },
    },
});
