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
const createConfig = (config = {}) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
        count: (_a = config.count) !== null && _a !== void 0 ? _a : 1,
        length: (_b = config.length) !== null && _b !== void 0 ? _b : 8,
        charset: (_c = config.charset) !== null && _c !== void 0 ? _c : (0, exports.charset)(Charset.ALPHANUMERIC),
        prefix: (_d = config.prefix) !== null && _d !== void 0 ? _d : '',
        postfix: (_e = config.postfix) !== null && _e !== void 0 ? _e : '',
        pattern: (_f = config.pattern) !== null && _f !== void 0 ? _f : placeholder.repeat((_g = config.length) !== null && _g !== void 0 ? _g : 8),
    });
};
const generateOne = ({ pattern, charset, prefix, postfix, }) => {
    let code = '';
    for (const p of pattern) {
        const c = p === placeholder ? randomElement(charset) : p;
        code += c;
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
