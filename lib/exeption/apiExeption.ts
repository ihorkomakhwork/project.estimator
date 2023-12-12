import Exeption from './baseExeption';

class NotFound extends Exeption {
    constructor(
        public message: string = 'Not Found',
        public code: number = 404,
        public options = {},
    ) {
        super(code, message, options);
    }
}

class BadRequest extends Exeption {
    constructor(
        public message: string = 'Bad Request',
        public code: number = 422,
        public options = {},
    ) {
        super(code, message, options);
    }
}

class Unauthorized extends Exeption {
    constructor(
        public message: string = 'Unauthorized',
        public code: number = 401,
        public options = {},
    ) {
        super(code, message, options);
    }
}

export default { NotFound, BadRequest, Unauthorized };
