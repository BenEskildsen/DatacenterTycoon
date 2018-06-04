'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var _require2 = require('./reducers'),
    rootReducer = _require2.rootReducer;

var Game = require('./Game.react');
var React = require('react');
var ReactDOM = require('react-dom');

var store = createStore(rootReducer);
window.store = store; // useful for debugging

ReactDOM.render(React.createElement(Game, { store: store }), document.getElementById('container'));