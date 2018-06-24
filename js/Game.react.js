const React = require('React');
const {forEach} = require('./utils');
const {round} = Math;
const {canAttack} = require('./reducers');

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {player, crypto} = this.state;
    const {dispatch} = this.props.store;
    const attack = canAttack(player.rigs * 100, crypto.hashRate);
    return (
      <div className="background">
        <div className="cryptoPanel">
          <p>{crypto.name}</p>
          <p>Coin value: {round(crypto.value * 100) / 100}</p>
          <p>Coins circulating: {crypto.coins}</p>
          <p>Hash strength: {crypto.hashStrength} hashes per coin</p>
          <p>Hash rate of competitors: {crypto.hashRate} kH/s</p>
          <button onClick={() => dispatch({type: 'buyCoin'})}>
            Buy a {crypto.name}
          </button>
          <button onClick={() => dispatch({type: 'sellCoin'})}>
            {attack ? 'Double spend' : 'Sell'}
          </button>
        </div>
        <div className="playerPanel">
          <p>Money: {round(player.money * 100) / 100}</p>
          <p>{crypto.name}: {player.coins}</p>
          <p>Mining: {player.rigs} rigs</p>
          <p>Hashing power: {player.rigs * 100}kH/s</p>
          <p>Electricity cost: {player.rigs * 2} $/s</p>
          <button onClick={() => dispatch({type: 'buyRig'})}>
            Buy rig (1k)
          </button>
        </div>
      </div>
    );
  }
}

module.exports = Game;
