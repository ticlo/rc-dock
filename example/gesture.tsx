import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {tsxTab} from "./prism-tabs";
import {DragDropDiv, GestureState} from '../src';

interface DemoState {
  scale: number;
  rotate: number;
  dx: number;
  dy: number;
}

class Demo extends React.PureComponent<{}, DemoState> {
  state: DemoState = {scale: 0, rotate: 0, dx: 0, dy: 0};
  _ref: HTMLElement;
  
  getRef = (r: HTMLElement) => {
    this._ref = r;
  };

  onGestureStart = (e: GestureState) => {
    return true;
  };
  onGestureMove = (e: GestureState) => {
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
        {tsxTab.content}
      </div>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);