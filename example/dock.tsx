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
          id: 'hello1',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world2',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world2',
        id: 'panel1',
      },
      {
        tabs: [{
          id: 'hello3',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world4',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world4',
        id: 'panel2',
      }
    ]
  },
  floatbox: {
    children: [
      {
        tabs: [{
          id: 'hello5',
          title: 'hello',
          content: <span style={{margin: 50}}>hello</span>,
          group
        }, {
          id: 'world6',
          title: 'world',
          content: <span style={{margin: 50}}>world</span>,
          group
        }],
        group,
        activeId: 'world6',
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
        <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));