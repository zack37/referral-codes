const test = require('ava');
const { generate, Charset, charset } = require('..');

test('should generate code of request length', (t) => {
  const length = 5;
  const [code] = generate({ length });

  t.is(code.length, length);
});

test('should generate code of default length', (t) => {
  const defaultLength = 8;
  const [code] = generate({});

  t.is(code.length, defaultLength);
});

test('should generate code if no config provided', (t) => {
  const defaultLength = 8;
  const [code] = generate();

  t.is(code.length, defaultLength);
});

test('should generate 5 unique codes', (t) => {
  const codes = generate({
    length: 2,
    count: 5,
  });

  t.is(codes.length, 5);
  for (const code of codes) {
    t.is(code.length, 2);
    t.is(codes.indexOf(code), codes.lastIndexOf(code)); // check uniqueness
  }
});

test('should generate a code consisting of numbers only', (t) => {
  const numbers = charset(Charset.NUMBERS);
  const [code] = generate({
    length: 10,
    charset: numbers,
  });

  t.regex(code, /^\d{10}$/);
});

test('should generate a code consisting of letters only', (t) => {
  const letters = charset(Charset.ALPHABETIC);
  const [code] = generate({
    length: 10,
    charset: letters,
  });

  t.regex(code, /^[a-zA-Z]{10}$/);
});

test('should generate code with prefix', (t) => {
  const [code] = generate({
    prefix: 'promo-',
  });

  t.assert(code.startsWith('promo-'));
});

test('should generate code with postfix', (t) => {
  const [code] = generate({
    postfix: '-extra',
  });

  t.assert(code.endsWith('-extra'));
});

test('should generate code with prefix and postfix', (t) => {
  const [code] = generate({
    prefix: 'promo-',
    postfix: '-extra',
  });

  t.regex(code, /^promo-.*-extra$/);
});

test('should generate code from pattern', (t) => {
  const [code] = generate({
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

  t.throws(() => generate(config), {
    message: 'Not possible to generate requested number of codes.',
  });
});

test('should generate fixed code', (t) => {
  const config = {
    count: 1,
    pattern: 'FIXED',
  };

  const codes = generate(config);

  t.is(codes.length, 1);
  t.is(codes[0], 'FIXED');
});
