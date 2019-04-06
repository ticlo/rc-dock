import React from 'react';
import ReactDOM from 'react-dom';
import {DragDropDiv, DragState} from '../lib';

class Demo extends React.Component {
  state = {droptxt: 'drop here'};
  onDragStart = (state: DragState) => {
    state.startDrag();
  };
  onDragOver = (state: DragState) => {
    state.accept('move');
  };
  onDrop = (state: DragState) => {
    this.setState({droptxt: 'dropped'});
  };

  render() {
    return (
      <div>
        <DragDropDiv style={{cursor: ''}} onDragStart={this.onDragStart}>drag here</DragDropDiv>
        <DragDropDiv onDragOver={this.onDragOver} onDrop={this.onDrop}>{this.state.droptxt}</DragDropDiv>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
