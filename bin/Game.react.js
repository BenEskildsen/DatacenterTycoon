'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('./utils'),
    forEach = _require.forEach;

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    // re-render when the store changes
    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          resume = _state.resume,
          scenario = _state.scenario;
      var dispatch = this.props.store.dispatch;


      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(OptionDialog, _extends({}, scenario, { dispatch: dispatch })),
        React.createElement(Resume, resume)
      );
    }
  }]);

  return Game;
}(React.Component);

var OptionDialog = function (_React$Component2) {
  _inherits(OptionDialog, _React$Component2);

  function OptionDialog() {
    _classCallCheck(this, OptionDialog);

    return _possibleConstructorReturn(this, (OptionDialog.__proto__ || Object.getPrototypeOf(OptionDialog)).apply(this, arguments));
  }

  _createClass(OptionDialog, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var options = this.props.options.map(function (option) {
        return React.createElement(
          'div',
          {
            className: 'option',
            key: 'option_' + option,
            onClick: function onClick(ev) {
              _this3.props.dispatch(_this3.props.action(option));
            } },
          option
        );
      });
      var dialog = React.createElement(
        'div',
        { className: 'dialog' },
        this.props.text
      );
      return React.createElement(
        'div',
        { className: 'optionDialog' },
        dialog,
        options
      );
    }
  }]);

  return OptionDialog;
}(React.Component);

var Resume = function (_React$Component3) {
  _inherits(Resume, _React$Component3);

  function Resume() {
    _classCallCheck(this, Resume);

    return _possibleConstructorReturn(this, (Resume.__proto__ || Object.getPrototypeOf(Resume)).apply(this, arguments));
  }

  _createClass(Resume, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          headings = _objectWithoutProperties(_props, ['name']);

      return React.createElement(
        'div',
        { className: 'resume' },
        React.createElement(
          'h2',
          null,
          name
        ),
        this.renderItem(1, headings)
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(level, items) {
      var _this5 = this;

      if (items == null) return;
      if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) != 'object') {
        return React.createElement(
          'div',
          { className: 'heading' + level },
          items
        );
      }
      var itemDivs = [];
      forEach(items, function (heading, item) {
        itemDivs.push(React.createElement(
          'span',
          { key: heading },
          React.createElement(
            'div',
            { className: 'heading' + level },
            heading
          ),
          React.createElement(
            'div',
            { className: 'heading' + level },
            _this5.renderItem(level + 1, item)
          )
        ));
      });
      return itemDivs;
    }
  }]);

  return Resume;
}(React.Component);

module.exports = Game;