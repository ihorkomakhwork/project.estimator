export default ({ authService, validationHooks, usersSchema }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(usersSchema.createDTO)],
        },
        async method({ payload }) {
            const result = await authService.register(payload);
            return { ...result, status: 201 };
        },
    },
});
