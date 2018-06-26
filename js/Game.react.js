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
      <div className="infoPanels">
        <div className="cryptoPanel">
          <p style={{textAlign: 'center', marginBottom: '10px'}}><b>{crypto.name} Tycoon</b></p>
          <p>Coin value ($): <Rhs>{round(crypto.value * 100) / 100}</Rhs></p>
          <p>Coins circulating: <Rhs>{crypto.coins}</Rhs></p>
          <p>Hash strength (kH/coin): <Rhs>{crypto.hashStrength}</Rhs></p>
          <p>Hash rate of competitors (kH/s): <Rhs>{crypto.hashRate}</Rhs></p>
          <button onClick={() => dispatch({type: 'buyCoin'})}>
            Buy
          </button>
          <button onClick={() => dispatch({type: 'sellCoin'})}>
            {attack ? 'Double(!) sell' : 'Sell'}
          </button>
        </div>
        <div className="playerPanel">
          <p>{crypto.name}{player.coins == 1 ? '' : 's'}: <Rhs>{player.coins}</Rhs></p>
          <p>Money ($): <Rhs>{round(player.money * 100) / 100}</Rhs></p>
          <p>Mining rigs: <Rhs>{player.rigs}</Rhs></p>
          <p>Hashing power (kH/s): <Rhs>{player.rigs * 100}</Rhs></p>
          <p>Electricity cost ($/s): <Rhs>{player.rigs * 2}</Rhs></p>
          <button onClick={() => dispatch({type: 'buyRig'})}>
            Buy rig (1k)
          </button>
        </div>
      </div>
    );
  }
}

class Rhs extends React.Component {
  render() {
    return (
      <span className="right">
        {this.props.children}
      </span>
    );
  }
}

module.exports = Game;
