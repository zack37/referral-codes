"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.generateOne = exports.charset = exports.Charset = void 0;
var Charset;
(function (Charset) {
    Charset["NUMBERS"] = "numbers";
    Charset["ALPHABETIC"] = "alphabetic";
    Charset["ALPHANUMERIC"] = "alphanumeric";
})(Charset = exports.Charset || (exports.Charset = {}));
const placeholder = '#';
const size = (fn, array) => fn ? Array.from(array).filter((x) => fn(x)).length : array.length;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = (array) => array[randomInt(0, array.length - 1)];
const charsets = {
    [Charset.NUMBERS]: '0123456789',
    [Charset.ALPHABETIC]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    [Charset.ALPHANUMERIC]: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};
const charset = (name) => charsets[name];
exports.charset = charset;
const createConfig = (config = {}) => ({
    count: config.count ?? 1,
    length: config.length ?? 8,
    charset: config.charset ?? (0, exports.charset)(Charset.ALPHANUMERIC),
    prefix: config.prefix ?? '',
    postfix: config.postfix ?? '',
    pattern: config.pattern ?? placeholder.repeat(config.length ?? 8),
});
const generateOne = ({ pattern, charset, prefix, postfix, }) => {
    let code = '';
    for (const p of pattern) {
        if (p === placeholder) {
            code += randomElement(charset);
        }
    }
    return `${prefix}${code}${postfix}`;
};
exports.generateOne = generateOne;
const isFeasible = (charset, pattern, count) => {
    return charset.length ** size((x) => x === placeholder, pattern) >= count;
};
const generate = (config) => {
    const validatedConfig = createConfig(config);
    const { charset, count, pattern } = validatedConfig;
    if (!isFeasible(charset, pattern, count)) {
        throw new Error('Not possible to generate requested number of codes.');
    }
    const codes = new Set();
    while (codes.size < count) {
        codes.add((0, exports.generateOne)(validatedConfig));
    }
    return Array.from(codes);
};
exports.generate = generate;
