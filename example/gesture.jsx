import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {jsxTab} from "./prism-tabs";
import {DragDropDiv, GestureState} from '../lib';

class Demo extends React.PureComponent {
  state = {scale: 0, rotate: 0, dx: 0, dy: 0};
  getRef = (r) => {
    this._ref = r;
  };

  onGestureStart = (e) => {
    return true;
  };
  onGestureMove = (e) => {
    let {scale, rotate, dx, dy} = e;
    this.setState({scale, rotate, dx, dy});
  };


  render() {
    let {scale, rotate, dx, dy} = this.state;
    return (
      <div>
        <DragDropDiv onGestureStartT={this.onGestureStart} onGestureMoveT={this.onGestureMove}/>
        <div className='sidebox'>
          scale: {scale} <br/>
          rotate: {rotate} <br/>
          dx: {dx} <br/>
          dy: {dy} <br/>
        </div>
        {jsxTab.content}
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
console.log(Buffer.from("Hello World").toString('base64'));