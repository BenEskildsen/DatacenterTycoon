const {createStore} = require('redux');
const {rootReducer} = require('./reducers');
const Game = require('./Game.react');
const React = require('react');
const ReactDOM = require('react-dom');

const store = createStore(rootReducer);
window.store = store; // useful for debugging
window.pause = () => clearInterval(window.interval);

window.interval = setInterval(() => store.dispatch({type: 'tick'}), 1000);

ReactDOM.render(
  <Game store={store} />,
  document.getElementById('container'),
);
