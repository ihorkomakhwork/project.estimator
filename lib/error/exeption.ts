export default abstract class Exeption extends Error {
    constructor(
        public code: number,
        public message: string,
        public options = {},
    ) {
        super(message, options);
    }
}
