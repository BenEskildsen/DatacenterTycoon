"use strict";

var floor = Math.floor,
    random = Math.random,
    round = Math.round;


var forEach = function forEach(obj, keyValFunc) {
  for (var key in obj) {
    keyValFunc(key, obj[key]);
  }
};

var oneOf = function oneOf(options) {
  return options[floor(random() * options.length)];
};

module.exports = {
  forEach: forEach,
  oneOf: oneOf
};