import React from 'react';
import ReactDOM from 'react-dom';
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout} from '../lib';

let groups = {
  allowWindow: {
    floatable: true,
    newWindow: true,
    maximizable: true,
  }
};

let floatTab = {
  id: 'float',
  title: 'New Window',
  content: (
    <div>
      <p>Right click on the max button ⇗</p>
    </div>
  ),
  group: 'allowWindow'
};


class Demo extends React.Component {
  mainTab = {
    id: 'main',
    title: 'Info',
    content: (
      <div>
        <p>Although rc-dock supports new window, a lot of packages will have error when controlling components in popup
          window.</p>
        <p>Please avoid complex mouse event handling and popup layers in the tab that allows popup window.</p>
      </div>
    )
  };
  layoutData = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          children: [
            {
              tabs: [this.mainTab, jsxTab, htmlTab],
              panelLock: {panelStyle: 'main'},
            }
          ]
        }
      ]
    },
    floatbox: {
      mode: 'float',
      children: [
        {
          tabs: [floatTab],
          x: 60, y: 60, w: 320, h: 300
        }
      ]
    }
  };


  render() {
    return (
      <DockLayout defaultLayout={this.layoutData} groups={groups}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
