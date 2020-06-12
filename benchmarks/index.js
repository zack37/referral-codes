const { Suite } = require('benchmark');
const { generate } = require('..');

const suite = new Suite();

const config = {
  length: 10,
};

suite
  .add('with 10 codes', () => {
    return generate({ ...config, count: 10 });
  })
  .add('with 100 codes', () => {
    return generate({ ...config, count: 100 });
  })
  .add('with 1000 codes', () => {
    return generate({ ...config, count: 1000 });
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .run({ async: true });
