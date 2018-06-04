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
			pricePerKW: 1,
      rackCounts: [1, 0],
      requests: 10, // thousand requests this tick
      incomePerReq: 10, // dollars per thousand requests served
    };
	}

	const {money, rackCounts} = state;
	switch (action.type) {
		case 'addRack':
			return addRackReducer(state, action);
    case 'tick':
      return tickReducer(state, action);
	}
};

const addRackReducer = (state, action) => {
	const {money, rackCounts} = state;
	const {rackType} = action;
	
	if (RACKS[rackType].price > money) {
		return state;	
	}
	
	rackCounts[rackType - 1] = rackCounts[rackType - 1] + 1;
	return {
		...state,
		money: money - RACKS[rackType].price,
	};
};

const tickReducer = (state, action) => {
	const {money, rackCounts, requests, powerAvailable, incomePerReq, t} = state;
	
	// compute requests served and power used
	// either we run out of power, we run out of racks, or we serve all requests
	let requestsLeft = requests;
	let power = powerAvailable;
  rackCounts.forEach((rackTypeCount, rackTypeIndex) => {
    for (let i = 0; i < rackTypeCount; i++) {
			const rack = RACKS[rackTypeIndex];
      requestsLeft -= rack.bandwidth;
			power -= rack.maxPower;
			if (power < 0) {
				if (power > rack.minPower) {
					requestsLeft += rack.bandwidth * (power - rack.minPower) / (rack.maxPower - rack.minPower);
				}
				power = 0;
				break;
			}
			if (requestsLeft < 0) {
				power += (rack.maxPower - rack.minPower) * (requestsLeft + rack.bandwidth) / rack.bandwidth;
				requestsLeft = 0;
				break;
			}
    }
	});
  const requestsHandled = requests - requestsLeft;
	const powerUsed = powerAvailable - power;
	
  return {
    ...state,
		t: t + 1,
		money: money + requestsHandled * incomePerReq - powerUsed * pricePerKW,
    requests: requests + oneOf([-2, -1, 0, 0, 0, 1, 1, 1, 2]); // random walk the next tick's requests
  };
}

module.exports = {rootReducer};
