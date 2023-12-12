import Exeption from './baseExeption';

class IvalidInput extends Exeption {
    constructor(
        public entity: string,
        public message: string = `Invalid input !`,
        public code: number = 400,
        public options = {},
    ) {
        super(code, message, options);
    }
}

export default { IvalidInput };
