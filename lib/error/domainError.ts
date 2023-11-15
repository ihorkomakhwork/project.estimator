import Exeption from './exeption';

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

export default { AlreadyExists };
