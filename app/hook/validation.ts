export default ({ lib }) => ({
    validate(validate) {
        return (payload) => {
            const valid = validate(payload);
            if (!valid) {
                throw new lib.exeption.api.BadRequest(validate.errors);
            }
        };
    },
});
