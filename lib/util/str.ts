// String utiliti function for postgres field name conversion
const camelToSnake = (str: string): string =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamel = (str: string): string =>
    str.replace(/(_\w)/g, (letter) => letter[1].toUpperCase());

export default { camelToSnake, snakeToCamel };
