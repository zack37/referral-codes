const test = require('ava');
const referralCodes = require('..');

test('should generate code of request length', (t) => {
  const length = 5;
  const [code] = referralCodes.generate({ length });

  t.is(code.length, length);
});

test('should generate code of default length', (t) => {
  const defaultLength = 8;
  const [code] = referralCodes.generate({});

  t.is(code.length, defaultLength);
});

test('should generate code if no config provided', (t) => {
  const defaultLength = 8;
  const [code] = referralCodes.generate();

  t.is(code.length, defaultLength);
});

test('should generate 5 unique codes', (t) => {
  const codes = referralCodes.generate({
    length: 2,
    count: 5,
  });

  t.is(codes.length, 5);
  codes.forEach((code) => {
    t.is(code.length, 2);
    t.is(codes.indexOf(code), codes.lastIndexOf(code)); // check uniqueness
  });
});

test('should generate a code consisting of numbers only', (t) => {
  const numbers = '0123456789';
  const [code] = referralCodes.generate({
    length: 10,
    charset: numbers,
  });

  t.is(code.length, 10);
  t.assert(code.split('').every((char) => numbers.includes(char)));
});

test('should generate a code consisting of letters only', (t) => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [code] = referralCodes.generate({
    length: 10,
    charset: letters,
  });

  t.is(code.length, 10);
  t.assert(code.split('').every((char) => letters.includes(char)));
});

test('should generate code with prefix', (t) => {
  const [code] = referralCodes.generate({
    prefix: 'promo-',
  });

  t.assert(code.startsWith('promo-'));
});

test('should generate code with postfix', (t) => {
  const [code] = referralCodes.generate({
    postfix: '-extra',
  });

  t.assert(code.endsWith('-extra'));
});

test('should generate code with prefix and postfix', (t) => {
  const [code] = referralCodes.generate({
    prefix: 'promo-',
    postfix: '-extra',
  });

  t.regex(code, /^promo-.*-extra$/);
});

test('should generate code from pattern', (t) => {
  const [code] = referralCodes.generate({
    pattern: '##-###-##',
  });

  t.regex(code, /^([\da-z]){2}-([\da-z]){3}-([\da-z]){2}$/i);
});

test('should detect infeasible config', (t) => {
  const config = {
    count: 1000,
    charset: 'abc',
    length: 5,
  }; // there are only 125 (5^3) possible codes for this config

  t.throws(() => referralCodes.generate(config), {
    message: 'Not possible to generate requested number of codes.',
  });
});

test('should generate fixed code', (t) => {
  const config = {
    count: 1,
    pattern: 'FIXED',
  };

  const codes = referralCodes.generate(config);

  t.is(codes.length, 1);
  t.is(codes[0], 'FIXED');
});
