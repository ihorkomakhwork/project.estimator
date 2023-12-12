import Exeption from './baseExeption';

class AlreadyExists extends Exeption {
    constructor(
        public message: string = 'Already exists!',
        public code: number = 409, // Conflict
        public options = {},
    ) {
        super(code, message, options);
    }
}

class UniqueConstraintError extends Exeption {
    constructor(
        public message: string = 'Unique constraint error!',
        public code: number = 409, // Conflict
        public options = {},
    ) {
        super(code, message, options);
    }
}

class ForeignKeyError extends Exeption {
    constructor(
        public message: string = 'Foreign key error!',
        public code: number = 409, // Conflict
        public options = {},
    ) {
        super(code, message, options);
    }
}

class MissingTableError extends Exeption {
    constructor(
        public message: string = 'Missing table error!',
        public code: number = 404, // Not Found
        public options = {},
    ) {
        super(code, message, options);
    }
}

class MissingColumnError extends Exeption {
    constructor(
        public message: string = 'Missing column error!',
        public code: number = 400, // Bad Request
        public options = {},
    ) {
        super(code, message, options);
    }
}

class SyntaxError extends Exeption {
    constructor(
        public message: string = 'Syntax error in SQL query!',
        public code: number = 400, // Bad Request
        public options = {},
    ) {
        super(code, message, options);
    }
}
export default {
    AlreadyExists,
    UniqueConstraintError,
    ForeignKeyError,
    MissingTableError,
    MissingColumnError,
    SyntaxError,
};
