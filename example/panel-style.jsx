import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let defaultGroup = {
  name: 'default',
  floatable: true
};

let headlessGroup = {
  name: 'headless',
  floatable: true,

  // this is a pre-defined style, defined here:
  // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
  panelClass: 'dock-headless-panel'
};

let customStyleGroup = {
  name: 'custom',
  closable: true,
  floatable: true,
  // this is a custom panel style defined in panel-style.html
  panelClass: 'my-panel'
};

let defaultTab = {
  title: 'default-style',
  content: (
    <div>
      Default style
    </div>
  ),
  group: defaultGroup
};
let headlessTab = {
  title: 'headless',
  content: (
    <div style={{background: '#f6f6f6', height: '100%', margin: 0, padding: 30}}>
      Hide border and header.
    </div>
  ),
  group: headlessGroup
};
let customTab = {
  title: 'custom-style',
  content: (
    <div>
      <p>Custom style</p>
      You can mix different styles in same layout, but they can't be docked into same panel.
    </div>
  ),
  group: customStyleGroup
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        size: 100,
        tabs: [{...defaultTab, id: 't7'}, {
          ...defaultTab, id: 't8', title: (
            <div className='github-icon'>
              custom-tab
            </div>
          ), content: (
            <div>
              Tab title can be any react component
            </div>
          )
        }],
      },
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...customTab, id: 't4'}, {...customTab, id: 't6'}, {...customTab, id: 't6'}],
          },
          {
            tabs: [{...headlessTab, id: 't1'}, {...headlessTab, id: 't2'}, {...headlessTab, id: 't3'}],
          },

        ]
      }

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
