const compareArrs = (arrA: any[], arrB: any[]): boolean => {
    return JSON.stringify(arrA) === JSON.stringify(arrB);
};

const truelyObjKeys = (obj: object) => {
    const key = Object.keys(obj);
    return key.filter((key) => Boolean(obj[key]));
};

const camelToSnake = (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const snakeToCamel = (str: string): string => {
    return str.replace(/(_\w)/g, (letter) => letter[1].toUpperCase());
};

const calculateExpiringUTC = (timeInMilliseconds) => {
    const currentDate = new Date();
    const expireDate = new Date(currentDate.getTime() + timeInMilliseconds);
    const formattedExpireDate = expireDate.toUTCString();
    return formattedExpireDate;
};

export default {
    compareArrs,
    truelyObjKeys,
    camelToSnake,
    snakeToCamel,
    calculateExpiringUTC,
};
