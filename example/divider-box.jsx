import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {jsxTab, htmlTab} from './prism-tabs';
import {DockLayout, DividerBox} from '../lib';

let layoutLeft = {
  dockbox: {
    mode: 'vertical',
    children: [
      {
        tabs: [{id: 't1', title: 'Tool', content: <div>Left Side Dock Layout</div>}],
      },
      {
        tabs: [{id: 't2', title: 'Tool', content: <div>Left Side Dock Layout</div>}],
      }
    ]
  },
};


let layoutRight = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{
          id: 't3',
          title: 'Dock',
          content: <div>Right Side Dock Layout.</div>
        }, jsxTab, htmlTab],
      }
    ]
  },
};


class Demo extends React.Component {
  render() {
    return (
      <DividerBox style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}>
        <DockLayout defaultLayout={layoutLeft} style={{width: '20%', minWidth: 100}}/>
        <DividerBox mode='vertical' style={{width: '20%', minWidth: 100}}>
          <div style={{border: '1px solid #ccc', padding: 5}}>not DockLayout, only DividerBox</div>
          <div style={{border: '1px solid #ccc'}}>You can use DividerBox for fixed Tool Panels</div>
        </DividerBox>
        <DockLayout defaultLayout={layoutRight} style={{width: '60%'}}/>
      </DividerBox>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
