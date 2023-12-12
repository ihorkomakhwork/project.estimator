export default ({ logger, lib }) =>
    (error: Error) => {
        if (error instanceof lib.exeption.BaseExeption) {
            const { code, message } = error as any;
            logger.error(error);
            return { message, code };
        }
        throw error;
    };
