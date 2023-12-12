export default abstract class BaseExeption extends Error {
    constructor(
        public code: number,
        public message: string,
        public options = {},
    ) {
        super(message, options);
    }
}
