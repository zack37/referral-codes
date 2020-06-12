const PLACEHOLDER = '#';
const CHARSETS = {
  NUMBERS: 'numbers',
  ALPHABETIC: 'alphabetic',
  ALPHANUMERIC: 'alphanumeric',
};

const size = (fn, array) =>
  fn ? Array.from(array).filter((x) => fn(x)).length : array.length;
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomElement = (array) => array[randomInt(0, array.length - 1)];

const charsets = {
  [CHARSETS.NUMBERS]: '0123456789',
  [CHARSETS.ALPHABETIC]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  [CHARSETS.ALPHANUMERIC]:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

const charset = (name) => charsets[name];

const createConfig = (config = {}) => ({
  count: config.count || 1,
  length: config.length || 8,
  charset: config.charset || charset(CHARSETS.ALPHANUMERIC),
  prefix: config.prefix || '',
  postfix: config.postfix || '',
  pattern: config.pattern || PLACEHOLDER.repeat(config.length || 8),
});

const generateOne = ({ pattern, charset, prefix, postfix }) => {
  // eslint-disable-next-line unicorn/no-reduce
  const code = Array.from(pattern).reduce(
    (acc, cur) => acc + (cur === PLACEHOLDER ? randomElement(charset) : cur),
    '',
  );

  return `${prefix}${code}${postfix}`;
};

const isFeasible = (charset, pattern, count) => {
  return charset.length ** size((x) => x === PLACEHOLDER, pattern) >= count;
};

const generate = (config) => {
  config = createConfig(config);
  const { charset, count, pattern } = config;

  if (!isFeasible(charset, pattern, count)) {
    throw new Error('Not possible to generate requested number of codes.');
  }

  const codes = new Set();
  while (codes.size < count) {
    codes.add(generateOne(config));
  }

  return Array.from(codes);
};

module.exports = {
  generate,
  charset,
  CHARSETS,
};
