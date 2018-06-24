'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('./utils'),
    forEach = _require.forEach;

var round = Math.round;

var _require2 = require('./reducers'),
    canAttack = _require2.canAttack;

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          player = _state.player,
          crypto = _state.crypto;
      var dispatch = this.props.store.dispatch;

      var attack = canAttack(player.rigs * 100, crypto.hashRate);
      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(
          'div',
          { className: 'cryptoPanel' },
          React.createElement(
            'p',
            null,
            crypto.name
          ),
          React.createElement(
            'p',
            null,
            'Coin value: ',
            round(crypto.value * 100) / 100
          ),
          React.createElement(
            'p',
            null,
            'Coins circulating: ',
            crypto.coins
          ),
          React.createElement(
            'p',
            null,
            'Hash strength: ',
            crypto.hashStrength,
            ' hashes per coin'
          ),
          React.createElement(
            'p',
            null,
            'Hash rate of competitors: ',
            crypto.hashRate,
            ' kH/s'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'buyCoin' });
              } },
            'Buy a ',
            crypto.name
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'sellCoin' });
              } },
            attack ? 'Double spend' : 'Sell'
          )
        ),
        React.createElement(
          'div',
          { className: 'playerPanel' },
          React.createElement(
            'p',
            null,
            'Money: ',
            round(player.money * 100) / 100
          ),
          React.createElement(
            'p',
            null,
            crypto.name,
            ': ',
            player.coins
          ),
          React.createElement(
            'p',
            null,
            'Mining: ',
            player.rigs,
            ' rigs'
          ),
          React.createElement(
            'p',
            null,
            'Hashing power: ',
            player.rigs * 100,
            'kH/s'
          ),
          React.createElement(
            'p',
            null,
            'Electricity cost: ',
            player.rigs * 2,
            ' $/s'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'buyRig' });
              } },
            'Buy rig (1k)'
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

module.exports = Game;