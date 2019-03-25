import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let defaultGroup = {
  floatable: true
};

let headlessGroup = {
  floatable: true,
  // this is a pre defined panel style
  panelClass: 'dock-headless-panel'
};

let customStyleGroup = {
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
    <div style={{background: '#eeeeff', height: '100%', margin: 0, padding: 30}}>
      Hide border and header in dock mode.<br/>
      But still show header when you drat them to float panel
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
        tabs: [{...headlessTab, id: 't1'}, {...headlessTab, id: 't2'}, {...headlessTab, id: 't3'}],
        group: headlessGroup,
        activeId: 't1',
      },
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...customTab, id: 't4'}, {...customTab, id: 't6'}, {...customTab, id: 't6'}],
            group: customStyleGroup,
            activeId: 't4',
          },
          {
            tabs: [{...defaultTab, id: 't7'}, {...defaultTab, id: 't8'}, {...defaultTab, id: 't9'}],
            group: defaultGroup,
            activeId: 't4',
          },
        ]
      }

    ]
  }
};

class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 200, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
