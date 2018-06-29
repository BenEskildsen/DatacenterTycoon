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
          memory = _state.memory,
          pointers = _state.pointers;
      var dispatch = this.props.store.dispatch;

      var memoryRows = [];
      var memoryRow = [];
      for (var i = 0; i < memory.length; i++) {
        if (i !== 0 && i % 10 === 0) {
          memoryRows.push(React.createElement(MemoryRow, { memoryRow: memoryRow, pointers: pointers }));
          memoryRow = [];
        }
        memoryRow.push(memory[i]);
      }
      memoryRows.push(React.createElement(MemoryRow, { memoryRow: memoryRow, pointers: pointers }));
      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(
          'div',
          { className: 'memory' },
          memoryRows
        )
      );
    }
  }]);

  return Game;
}(React.Component);

var MemoryRow = function (_React$Component2) {
  _inherits(MemoryRow, _React$Component2);

  function MemoryRow() {
    _classCallCheck(this, MemoryRow);

    return _possibleConstructorReturn(this, (MemoryRow.__proto__ || Object.getPrototypeOf(MemoryRow)).apply(this, arguments));
  }

  _createClass(MemoryRow, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { key: this.props.memoryRow.toString(), className: 'memoryRow' },
        this.props.memoryRow
      );
    }
  }]);

  return MemoryRow;
}(React.Component);

module.exports = Game;