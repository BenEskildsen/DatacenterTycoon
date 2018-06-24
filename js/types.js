// @flow

export type Coins = number;
export type Dollars = number;
export type Hashes = number;

export type Crypto = {
  name: string,
  hashStrength: Hashes, // each hash has 1 / hashStrength chance of mining a coin
  hashRate: Hashes, // total hash rate of all other miners of this coin
                // the higher the value, the higher the hashRate
  coins: Coins, // coins in circulation
  value: Dollars,
};

export type Player = {
  money: Dollars,
  coins: Coins, // amount of crpyto
  rigs: number,
};

export type State = {
  t: number,
  player: Player,
  crypto: Crypto,
};
