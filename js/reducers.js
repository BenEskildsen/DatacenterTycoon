// @flow

const {oneOf} = require('./utils');

export type KW = number;
export type GB = number;
export type RequestsPerTick = number; // Thousands of requests per tick
export type Rack = {
  name: string,
  price: number,
  purpose: string,
  minPower: KW,
  maxPower: KW,
  bandwidth: RequestsPerTick,
  memory: GB,
};

const RACKS: Array<Rack> = [
  {name: 'Type I', price: 50000, purpose: 'Serve ads', minPower: 5, maxPower: 15, bandwidth: 1, memory: 16},
  {name: 'Type II', price: 75000, purpose: 'Database', minPower: 10, maxPower: 10, bandwidth: 2, memory: 1000},
];

const rootReducer = (state, action) => {
	if (state === undefined) {
		return {
      t: 0,
      money: 1000000,
      powerAvailable: 10000,
      powerUsed: 0,
      rackCounts: [1, 0],
      requests: 10, // thousand requests this tick
      incomePerReq: 10, // dollars per thousand requests served
    };
	}

	switch (action.type) {
		case 'addRack':
			state.rackCounts[action.rackType - 1] = state.rackCounts[action.rackType - 1] + 1;
			return state;
    case 'tick':
      return tickReducer(state, action);
	}
};

const tickReducer = (state, action) => {
  const powerUsed =
  return {
    ...state,

    t: t + 1,
  };
}

const requestsHandled = (rackCounts, requests) => {
  let requestsLeft = requests;
  rackCounts.forEach((rackTypeCount, rackTypeIndex) => {
    for (let i = 0; i < rackTypeCount; i++) {
      requestsLeft -= RACKS[rackTypeIndex].bandwidth;
    }
}

const powerNeeded = (rackCounts, requests) => {
  const totalPowerNeeded = 0;
  rackCounts.forEach((rackTypeCount, rackTypeIndex) => {
    for (let i = 0; i < rackTypeCount; i++) {
      totalPowerNeeded += RACKS[rackTypeIndex].
    }
  });
}

module.exports = {rootReducer};
