'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./utils'),
    oneOf = _require.oneOf,
    maybeMinus = _require.maybeMinus,
    minusToZero = _require.minusToZero;

var _require2 = require('./entities'),
    nextValue = _require2.nextValue,
    getInitialState = _require2.getInitialState;

var ceil = Math.ceil,
    floor = Math.floor,
    random = Math.random,
    round = Math.round;


var HASHES_PER_RIG = 100;
var mine = function mine(hashRate, hashStrength) {
  var base = floor(hashRate / hashStrength);
  var fraction = hashRate / hashStrength * 100 % 100 / 100;
  return base + (random() < fraction ? ceil(fraction) : floor(fraction));
};
var canAttack = function canAttack(player, market) {
  return player / (player + market) > 0.5;
};

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();
  var player = state.player,
      crypto = state.crypto;

  switch (action.type) {
    case 'buyCoin':
      var canBuy = player.money > crypto.value;
      return _extends({}, state, {
        player: _extends({}, player, {
          money: maybeMinus(player.money, crypto.value),
          coins: canBuy ? player.coins + 1 : player.coins
        })
      });
    case 'sellCoin':
      var mult = canAttack(player.rigs * HASHES_PER_RIG, crypto.hashRate) ? 2 : 1;
      var canSell = player.coins > 0;
      return _extends({}, state, {
        player: _extends({}, player, {
          money: canSell ? player.money + mult * crypto.value : player.money,
          coins: canSell ? player.coins - 1 : player.coins
        })
      });
    case 'buyRig':
      canBuy = player.money > 1000;
      return _extends({}, state, {
        player: _extends({}, player, {
          money: maybeMinus(player.money, 1000),
          rigs: canBuy ? player.rigs + 1 : player.rigs
        })
      });
    case 'tick':
      var nextPlayerCoins = player.coins + mine(player.rigs * HASHES_PER_RIG, crypto.hashStrength);
      return _extends({}, state, {
        t: state.t + 1,
        player: _extends({}, player, {
          money: minusToZero(player.money, player.rigs * 2),
          coins: nextPlayerCoins
        }),
        crypto: _extends({}, crypto, {
          coins: crypto.coins + nextPlayerCoins + mine(crypto.hashRate, crypto.hashStrength),
          value: nextValue(crypto)
        })
      });
  }
};

module.exports = { rootReducer: rootReducer, canAttack: canAttack };