// @flow

const {oneOf, maybeMinus, minusToZero} = require('./utils');
const {nextValue, getInitialState} = require('./entities');
const {ceil, floor, random, round} = Math;

import type {State, Crypto, Player, Coins, Dollars, Hashes} from 'types'

const HASHES_PER_RIG: Hashes = 100;
const mine = (hashRate: Hashes, hashStrength: Hashes): Coins => {
  const base = floor(hashRate / hashStrength);
  const fraction = ((hashRate / hashStrength * 100) % 100) / 100;
  return base + (random() < fraction ? ceil(fraction) : floor(fraction));
};
const canAttack = (player: Hashes, market: Hashes) => player / (player + market) > 0.5;

const rootReducer = (state: State, action): State => {
	if (state === undefined) return getInitialState();
	const {player, crypto} = state;
	switch (action.type) {
		case 'buyCoin':
      let canBuy = player.money > crypto.value;
      return {
        ...state,
        player: {
          ...player,
          money: maybeMinus(player.money, crypto.value),
          coins: canBuy ? player.coins + 1 : player.coins,
        }
      };
    case 'sellCoin':
      const mult = canAttack(player.rigs * HASHES_PER_RIG, crypto.hashRate) ? 2 : 1;
      let canSell = player.coins > 0;
      return {
        ...state,
        player: {
          ...player,
          money: canSell ? player.money + mult * crypto.value : player.money,
          coins: canSell ? player.coins - 1 : player.coins,
        }
      };
    case 'buyRig':
      canBuy = player.money > 1000;
      return {
        ...state,
        player: {
          ...player,
          money: maybeMinus(player.money, 1000),
          rigs: canBuy ? player.rigs + 1 : player.rigs,
        }
      };
    case 'tick':
      const nextPlayerCoins = player.coins + mine(player.rigs * HASHES_PER_RIG, crypto.hashStrength);
      return {
        ...state,
        t: state.t + 1,
        player: {
          ...player,
          money: minusToZero(player.money, player.rigs * 2),
          coins: nextPlayerCoins,
        },
        crypto: {
          ...crypto,
          coins: crypto.coins + nextPlayerCoins + mine(crypto.hashRate, crypto.hashStrength),
          value: nextValue(crypto),
        }
      };
	}
};

module.exports = {rootReducer, canAttack};
