// @flow

const {e, normalIn, oneOf, randomIn, minusToZero, orZero} = require('./utils');
const {random} = Math;

import type {Hashes, Coins, Dollars, Crypto, Player, State} from 'types';

const getInitialState = (): State => {
  return {
    t: 0,
    player: {
      money: 10000,
      coins: 0,
      rigs: 5,
    },
    crypto: {
      name: oneOf(['techie', 'micro', 'face', 'ameri', 'garli', 'ponzi', 'pyrami']) + 'Coin',
      hashStrength: 1000,
      hashRate: 1000,
      value: 1,
      coins: 1000,
    },
  };
};

const nextValue = (crypto: Crypto): Dollars => {
  if (random() * 1000 > 1.1) {
    return orZero(crypto.value + (normalIn(0, 1000) - 20) / 100);
  } else {
    return orZero(crypto.value * normalIn(25, 75) / 100);
  }
};

// nextHashStrength follows a bounded exponential
// const nextHashStrength = (crypto: Crypto, t: number): number => {
//   return crypto.hashStrength + logistic(MAX_HASH_STRENGTH,
// };

module.exports = {
  getInitialState,
  nextValue,
}
