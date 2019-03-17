import React from 'react';
import ReactDOM from 'react-dom';

import {DockTabs} from "../src/DockTabs";
import {BoxData, LayoutData, PanelData, TabData, TabGroup} from "../src/DockData";
import {DockPanel} from "../src/DockPanel";
import {DockBox} from "../src/DockBox";
import {DockLayout} from "../src/DockLayout";

let group: TabGroup = {
  closable: true
};
let box: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{
          id: 'hello',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world',
        id: 'panel1',
      },
      {
        tabs: [{
          id: 'hello',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world',
        id: 'panel2',
      }
    ]
  },
  floatbox: {
    children: [
      {
        tabs: [{
          id: 'hello',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world',
        id: 'panel2',
        x: 20, y: 30, w: 200, h: 200
      }
    ]
  }
};

interface State {
  activeId: string;
}

class Demo extends React.Component<any, State> {
  state = {activeId: 'world'};

  onTabChange = (activeId: string) => {
    this.setState({activeId});
  };

  render() {
    return (
      <div style={{margin: 20}}>
        <h2>Addable Tabs</h2>
        <DockLayout defaultLayout={box} style={{position: 'absolute', left: 100, top: 100, width: 600, height: 300}}/>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));