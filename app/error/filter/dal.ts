export default ({ logger, lib }) =>
    (error: Error) => {
        const codes = {
            '23505': lib.exeption.dal.AlreadyExists,
            '23503': lib.exeption.dal.ForeignKeyError,
            '42P01': lib.exeption.dal.MissingTableError,
            '42703': lib.exeption.dal.MissingColumnError,
            '42601': lib.exeption.dal.SyntaxError,
        };
        const { code } = error as any;
        if (code in codes) {
            logger.error(error);
            const Exeption = codes[code];
            throw new Exeption();
        }
        throw error;
    };
