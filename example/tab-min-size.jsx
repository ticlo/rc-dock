import React from 'react';
import ReactDOM from 'react-dom';
import {jsxTab, htmlTab} from './prism-tabs';
import {DockLayout} from '../lib';

function getTab(width, height) {
  let title = `size ${width}x${height}`;
  return {
    id: title,
    title,
    minWidth: width,
    minHeight: height,
    content: (
      <div>
        <p>This tab has a minimal size.<br/>
          {width} x {height} px</p>
      </div>
    ),
  }
}

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [getTab(300, 300), getTab(300, 0)],
          },
          {
            tabs: [getTab(300, 100), getTab(100, 100)],
          },
          jsxTab,
          htmlTab
        ]
      },
      {
        tabs: [getTab(0, 300), getTab(0, 0)],
      },
    ]
  }
};

class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
