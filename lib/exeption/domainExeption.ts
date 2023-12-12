import Exeption from './baseExeption';

class AlreadyExists extends Exeption {
    constructor(
        public entity: string,
        public message: string = `${entity} already exists!`,
        public code: number = 409,
        public options = {},
    ) {
        super(code, message, options);
    }
}
class NotFound extends Exeption {
    constructor(
        public entity: string,
        public message: string = `${entity} Not Found`,
        public code: number = 404,
        public options = {},
    ) {
        super(code, message, options);
    }
}
export default { AlreadyExists, NotFound };
