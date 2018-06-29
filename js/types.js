// @flow

export type Pass = true;
export type Fail = false;
export type Pointer = number;
export type Bit = 0 | 1;
export type Player = Bit;
export type Allocation = {player: Player, size: number};

export type State = {
  turn: Player,
  memory: Array<Bit>,
  pointers: Array<Allocation>,
  success: Pass | Fail,
};

