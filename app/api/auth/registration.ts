export default ({
    authService,
    validationHooks,
    usersSchema,
    accessHooks,
}) => ({
    create: {
        hooks: {
            prev: [
                validationHooks.validate(usersSchema.createDTO),
                accessHooks.allowRoles(['customer', 'employee']),
            ],
        },
        async method({ payload }) {
            const result = await authService.register(payload);
            return { ...result, code: 201 };
        },
    },
});
