// @flow

const {getInitialState} = require('./entities');
const {oneOf, maybeMinus, minusToZero} = require('./utils');
const {ceil, floor, random, round} = Math;

import type {Pass, Fail, Pointer, Bit, Player, Allocation, State} from 'types';

export type Action = Malloc | Free | Write | Realloc | Calloc;
export type Malloc = {type: 'malloc', size: number, pointer: Pointer};
export type Realloc = {type: 'realloc', increase: number, pointer: Pointer};
export type Free = {type: 'free', pointer: Pointer};
export type Write = {type: 'write', pointer: Pointer, offset: number, bit: Bit, length: number};
export type Calloc = {type: 'calloc', size: number, pointer: Pointer};

const rootReducer = (state: State, action: Action): State => {
	if (state === undefined) return getInitialState();
	const {memory, pointers, success, turn} = state;
	switch (action.type) {
		case 'malloc':
      return malloc(state, action);
    case 'free':
      return free(state, action);
    case 'write':
      return write(state, action);
    case 'realloc':
      return write(state, action);
    case 'calloc':
      return calloc(state, action);
	}
  return state;
};

const malloc = (state: State, action: Malloc): State => {
  const {pointers, turn} = state;
  const {pointer, size} = action;
  let success = true;
  if (overlaps(pointers, pointer, size)) {
    success = false;
  }
  return {
    ...state,
    pointers: success ? {...pointers, [pointer]: {player: turn, size}} : pointers,
    success,
    turn: (turn + 1) % 2,
  };
};

const free = (state: State, action: Free): State => {
  const {pointers, turn} = state;
  const {pointer} = free;
  const nextPointers = {...pointers};
  let success = false;
  if (pointers[pointer]) {
    console.log(pointers[pointer]);
    success = true;
    delete nextPointers[pointer];
    console.log(nextPointers);
  }
  return {...state, pointers: nextPointers, turn: (turn + 1) % 2, success};
};

const write = (state: State, action: Write): State => {
  const {pointers, memory, turn} = state;
  const {pointer, offset, length, bit} = action;
  const allocation = pointers[pointer];
  let success = true;
  if (!allocation || allocation.player != bit || allocation.size < offset + length) {
    success = false;
    return {...state, success, turn: (turn + 1) % 2};
  }
  const nextMemory = [...memory];
  for (let i = 0; i < length; i++) {
    nextMemory[pointer + offset + i] = bit;
  }
  return {...state, memory: nextMemory, success, turn: (turn + 1) % 2};
};

// TODO: implement realloc taking up to as much as it can when it overlaps a friendly pointer
const realloc = (state: State, action: Realloc): State => {
  const {pointers, turn} = state;
  const {pointer, increase} = action;
  const allocation = pointers[pointer];
  let success = true;
  if (!allocation || overlaps(pointers, pointer + 1, allocation.size + increase - 1)) {
    success = false;
    return {...state, success, turn: (turn + 1) % 2};
  }
  const nextPointers = [...pointers];
  nextPointers[pointer] = {...allocation, size: allocation.size + increase};
  return {...state, pointers: nextPointers, success, turn: (turn + 1) % 2};
};

const calloc = (state: State, action: Calloc): State => {
  const {pointer, size} = action;
  const mallocState = malloc(state, {type: 'malloc', pointer, size});
  if (!mallocState.success) {
    return mallocState;
  }
  const writeState = write(
    mallocState, {type: 'write', pointer, offset: 0, bit: 0, length: size},
  );
  return {
    ...writeState,
    turn: (writeState.turn + 1) % 2,
  }
};

const overlaps = (pointers: Array<Allocation>, pointer: Pointer, size: number): boolean => {
  for (let i = 0; i < size; i++) {
    if (pointers[pointer + i]) {
      return true;
    }
  }
  return false;
}

module.exports = {rootReducer};
