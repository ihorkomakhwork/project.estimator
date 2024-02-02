import { ILoginDTO } from '../../contract/domain';

export default ({ authLocalService, validationHooks, authSchema, client }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(authSchema.login)],
        },
        async method({ payload }) {
            const { email, password } = payload as ILoginDTO;
            const result = await authLocalService.login(email, password);
            client.send();
            return { ...result, code: 201 };
        },
    },
});
