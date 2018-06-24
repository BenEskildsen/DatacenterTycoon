"use strict";

var floor = Math.floor,
    random = Math.random,
    round = Math.round;


var forEach = function forEach(obj, keyValFunc) {
  for (var key in obj) {
    keyValFunc(key, obj[key]);
  }
};

var shamefulGaussian = function shamefulGaussian() {
  return (random() + random() + random() + random() + random() + random() - 3) / 3;
};

var randomIn = function randomIn(min, max) {
  return floor(min + random() * (max - min + 1));
};

var normalIn = function normalIn(min, max) {
  var gaussian = shamefulGaussian();
  return floor(min + gaussian * (max - min + 1));
};

var oneOf = function oneOf(options) {
  return options[floor(random() * options.length)];
};

var e = 2.718281828459;

var maybeMinus = function maybeMinus(a, b) {
  return a > b ? a - b : a;
};
var orZero = function orZero(a) {
  return a > 0 ? a : 0;
};
var minusToZero = function minusToZero(a, b) {
  return a - b > 0 ? a - b : 0;
};

module.exports = {
  e: e,
  forEach: forEach,
  normalIn: normalIn,
  oneOf: oneOf,
  randomIn: randomIn,
  minusToZero: minusToZero,
  maybeMinus: maybeMinus,
  orZero: orZero
};