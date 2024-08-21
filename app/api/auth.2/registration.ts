export default ({ authJWTService, validationHooks, usersSchema }) => ({
    create: {
        hooks: {
            prev: [validationHooks.validate(usersSchema.createDTO)],
        },
        async method({ payload }) {
            const result = await authLocalService.register(payload);
            return { ...result, code: 201 };
        },
    },
});
