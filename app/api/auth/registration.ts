import { IUserDTO } from '../../contract/idomain';

export default ({ authService, validationHooks, usersSchema }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(usersSchema.dto)],
        },
        async method(payload: IUserDTO) {
            const result = await authService.register(payload);
            return { ...result, status: 201 };
        },
    },
});
