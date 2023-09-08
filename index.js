export var Charset;
(function (Charset) {
    Charset["NUMBERS"] = "numbers";
    Charset["ALPHABETIC"] = "alphabetic";
    Charset["ALPHANUMERIC"] = "alphanumeric";
})(Charset = Charset || (Charset = {}));
const placeholder = '#';
function size(fn, array) {
    return fn ? [...array].filter((x) => fn(x)).length : array.length;
}
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = (array) => array[randomInt(0, array.length - 1)];
const charsets = {
    [Charset.NUMBERS]: '0123456789',
    [Charset.ALPHABETIC]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    [Charset.ALPHANUMERIC]: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};
export const charset = (name) => charsets[name];
const createConfig = (config = {}) => ({
    count: config.count ?? 1,
    length: config.length ?? 8,
    charset: config.charset ?? charset(Charset.ALPHANUMERIC),
    prefix: config.prefix ?? '',
    postfix: config.postfix ?? '',
    pattern: config.pattern ?? placeholder.repeat(config.length ?? 8),
});
export const generateOne = ({ pattern, charset, prefix, postfix, }) => {
    let code = '';
    for (const p of pattern) {
        const c = p === placeholder ? randomElement(charset) : p;
        code += c;
    }
    return `${prefix}${code}${postfix}`;
};
const isFeasible = (charset, pattern, count) => {
    return charset.length ** size((x) => x === placeholder, pattern) >= count;
};
export const generate = (config) => {
    const validatedConfig = createConfig(config);
    const { charset, count, pattern } = validatedConfig;
    if (!isFeasible(charset, pattern, count)) {
        throw new Error('Not possible to generate requested number of codes.');
    }
    const codes = new Set();
    while (codes.size < count) {
        codes.add(generateOne(validatedConfig));
    }
    return [...codes];
};
