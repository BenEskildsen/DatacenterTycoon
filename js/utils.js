const {floor, random, round} = Math;

const forEach = (obj, keyValFunc) => {
  for (let key in obj) {
    keyValFunc(key, obj[key]);
  }
}

const shamefulGaussian = () => (random() + random() + random() + random() + random() + random() - 3) / 3;

const randomIn = (min, max) => floor(min + random() * (max - min + 1));

const normalIn = (min, max) => {
  const gaussian = shamefulGaussian();
  return floor(min + gaussian * (max - min + 1))
}

const oneOf = (options) => options[floor(random() * options.length)];

const e = 2.718281828459;

const maybeMinus = (a, b) => a > b ? a - b : a;
const orZero = (a) => a > 0 ? a : 0;
const minusToZero = (a, b) => a - b > 0 ? a - b : 0;

const initArray = (fn, len) => {
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push(fn(i))
  }
  return array;
}

module.exports = {
  e,
  initArray,
  forEach,
  normalIn,
  oneOf,
  randomIn,
  minusToZero,
  maybeMinus,
  orZero,
};
