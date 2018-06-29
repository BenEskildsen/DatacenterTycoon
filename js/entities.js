// @flow

const {oneOf, initArray} = require('./utils');

import type {Pass, Fail, Pointer, Bit, State} from 'types';

const getInitialState = (): State => {
  return {
    turn: 1,
    memory: initArray((i) => oneOf([0, 1]), 100),
    pointers: [],
    success: true,
  }
};

module.exports = {
  getInitialState,
}
