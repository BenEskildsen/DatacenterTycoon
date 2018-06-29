'use strict';

var _require = require('./utils'),
    oneOf = _require.oneOf,
    initArray = _require.initArray;

var getInitialState = function getInitialState() {
  return {
    turn: 1,
    memory: initArray(function (i) {
      return oneOf([0, 1]);
    }, 100),
    pointers: [],
    success: true
  };
};

module.exports = {
  getInitialState: getInitialState
};