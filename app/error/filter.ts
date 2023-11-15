export default ({ logger, lib }) => ({
    global(error: Error) {
        if (error instanceof lib.error.Exeption) {
            const { code, message, stack } = error as any;
            logger.error({ code, message, stack });
            return { message, code };
        }
        throw error;
    },
});
