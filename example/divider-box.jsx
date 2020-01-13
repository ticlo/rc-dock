import React from 'react';
import ReactDOM from 'react-dom';
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
          content: <div>Right Side Dock Layout.<br/>You can use DividerBox for fixed Tool Panels</div>
        }, jsxTab, htmlTab],
      }
    ]
  },
};


class Demo extends React.Component {
  render() {
    return (
      <DividerBox style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}>
        <DockLayout defaultLayout={layoutLeft} style={{width: 200, minWidth: 100}}/>
        <DockLayout defaultLayout={layoutRight} style={{width: 800, minWidth: 100, flex: '1 1 auto'}}/>
      </DividerBox>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
