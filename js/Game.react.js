const React = require('React');
const {forEach} = require('./utils');
const {round} = Math;

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {memory, pointers} = this.state;
    const {dispatch} = this.props.store;
    const memoryRows = [];
    let memoryRow = [];
    for (let i = 0; i < memory.length; i++) {
      if (i !== 0 && i % 10 === 0) {
        memoryRows.push(<MemoryRow memoryRow={memoryRow} pointers={pointers} />);
        memoryRow = [];
      }
      memoryRow.push(memory[i]);
    }
    memoryRows.push(<MemoryRow memoryRow={memoryRow} pointers={pointers} />);
    return (
      <div className="background">
        <div className="memory">
          {memoryRows}
        </div>
      </div>
    );
  }
}

class MemoryRow extends React.Component {
  render() {
    return (
      <div key={this.props.memoryRow.toString()} className="memoryRow">
        {this.props.memoryRow}
      </div>
    );
  }
}

module.exports = Game;
