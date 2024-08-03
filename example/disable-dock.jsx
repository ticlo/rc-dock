import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {jsxTab, htmlTab} from './prism-tabs';
import {DockLayout, DockContextType} from '../lib';


let groups = {
  floatOnly: {
    floatable: true,
    disableDock: true,
  }
};

let layout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{id: 't1', title: 'Dock', content: <div>Dock Content</div>}, jsxTab, htmlTab],
      }
    ]
  },
  floatbox: {
    mode: 'float',
    children: [
      {
        tabs: [
          {id: 't2', title: 'Float', content: <div>Float Content</div>, group: 'floatOnly'},
          {id: 't3', title: 'Float', content: <div>Float Content</div>, group: 'floatOnly'}
        ],
        x: 300, y: 150, w: 400, h: 300
      }
    ]
  }
};


class Demo extends React.Component {

  render() {
    return (
      <DockLayout defaultLayout={layout} groups={groups}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
