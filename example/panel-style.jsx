import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';


let groups = {
  headless: {
    // the css class for this would be dock-panel-headless
    // this is a pre-defined style, defined here:
    // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
    floatable: true,
  },
  custom: {
    // the css class for this would be dock-panel-custom
    // this is a custom panel style defined in panel-style.html
    closable: true,
    floatable: true,
  }
};

let defaultTab = {
  title: 'default-style',
  content: (
    <div>
      Tabs from different style group can't be docked in same panel
    </div>
  ),
};
let headlessTab = {
  title: 'headless',
  content: (
    <div style={{background: '#f6f6f6', height: '100%', margin: 0, padding: 30}}>
      <p>Hide border and header.</p>
      Move mouse near top border to show header.
    </div>
  ),
  // this is a pre-defined style, defined here:
  // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
  group: 'headless'
};
let cardTab = {
  title: 'card-style',
  content: (
    <div>
      card style
    </div>
  ),
  // this is a pre-defined style, defined here:
  // https://github.com/ticlo/rc-dock/blob/master/style/predefined-panels.less
  group: 'card'
};
let customTab = {
  title: 'custom-style',
  content: (
    <div>
      Custom style
    </div>
  ),
  // you can mix predefined style with you own style
  // separate 2 styles with space
  // the panel class will contain both dock-style-car and dock-style-custom
  group: 'card custom'
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
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
            tabs: [{...cardTab, id: 't9'}, {...cardTab, id: 't10'}, {...cardTab, id: 't11'}],
          },

        ]
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
