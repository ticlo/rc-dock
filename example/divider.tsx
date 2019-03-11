import React from 'react';
import ReactDOM from 'react-dom';
import {BoxChild, Divider} from '../src/Divider';

let index = 1;

interface State {
  sizes: number[];
}

class Demo extends React.Component<any, State> {
  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };
  state = {sizes: [200, 200, 200]};
  getBoxData = (idx: number) => {
    let children: any[] = [];
    this._ref.childNodes.forEach((child: HTMLDivElement) => {
      if (!child.classList.contains('dock-divider')) {
        children.push({size: child.offsetWidth, minSize: 20});
      }
    });
    return {
      element: this._ref,
      beforeDivider: children.slice(0, idx),
      afterDivider: children.slice(idx)
    };
  };
  changeSizes = (sizes: number[]) => {
    this.setState({sizes});
  };

  render() {
    let {sizes} = this.state;
    return (
      <div ref={this.getRef} className='box'>
        <div style={{background: 'blue', width: sizes[0]}}/>
        <Divider idx={1} getBoxData={this.getBoxData} changeSizes={this.changeSizes}/>
        <div style={{background: 'red', width: sizes[1]}}/>
        <Divider idx={2} getBoxData={this.getBoxData} changeSizes={this.changeSizes}/>
        <div style={{background: 'green', width: sizes[2]}}/>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));