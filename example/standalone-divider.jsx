import React from 'react';
import ReactDOM from 'react-dom';
import {Divider} from '../lib';

class Demo extends React.Component {
  getRef = (r) => {
    this._ref = r;
  };

  // default sizes
  state = {sizes: [200, 200, 30]};

  // when divider is dragged, this function will be called to measure the elements' size
  getDividerData = (idx) => {
    let children = [];
    this._ref.childNodes.forEach((child) => {
      if (!child.classList.contains('dock-divider')) {
        children.push({
          size: child.offsetWidth,
          minSize: 20 // give them 20px min width
        });
      }
    });
    return {
      element: this._ref,
      beforeDivider: children.slice(0, idx),
      afterDivider: children.slice(idx)
    };
  };

  // callback from the dragging
  changeSizes = (sizes) => {
    this.setState({sizes});
  };

  render() {
    let {sizes} = this.state;
    return (
      <div>
      Divider can be used separately, this doesn't require anything else from the dock layout
        <div ref={this.getRef} className='box'>
          <div style={{width: sizes[0]}}/>
          <Divider idx={1} getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
          <div style={{width: sizes[1]}}/>
          <Divider idx={2} getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
          <div style={{width: sizes[2]}}/>
        </div>
        Dragging with shift key to resize all children, otherwise only 2 children are affected
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
