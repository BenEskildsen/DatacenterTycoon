const {floor, random, round} = Math;

const forEach = (obj, keyValFunc) => {
  for (let key in obj) {
    keyValFunc(key, obj[key]);
  }
}

const oneOf = (options) => options[floor(random() * options.length)];

module.exports = {
  forEach,
  oneOf,
};
