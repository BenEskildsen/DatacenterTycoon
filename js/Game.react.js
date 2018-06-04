const React = require('React');
const {forEach} = require('./utils');

class Game extends React.Component {
  constructor(props) {
    super(props);
    // re-render when the store changes
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {resume, scenario} = this.state;
    const {dispatch} = this.props.store;

    return (
      <div className="background">
        <OptionDialog {...scenario} dispatch={dispatch} />
      </div>
    );
  }
}

class OptionDialog extends React.Component {
  render() {
    const options = this.props.options.map(option => (
      <div
        className="option"
        key={'option_' + option}
        onClick={(ev) => {
          this.props.dispatch(this.props.action(option));
        }}>
        {option}
      </div>
    ));
    const dialog = <div className="dialog">{this.props.text}</div>;
    return (
      <div className="optionDialog">
        {dialog}
        {options}
      </div>
    );
  }
}

module.exports = Game;
