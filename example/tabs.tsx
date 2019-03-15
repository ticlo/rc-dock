import React from 'react';
import ReactDOM from 'react-dom';

import {DockTabs} from "../src/DockTabs";
import {BoxData, PanelData, TabData, TabGroup} from "../src/DockData";
import {DockPanel} from "../src/DockPanel";
import {DockBox} from "../src/DockBox";

let group: TabGroup = {
  closable: true
};
let box: BoxData = {
  id: 1,
  size: 1,
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
      size: 1,
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
      size: 1,
      id: 'panel2',
    }
  ]
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
        <div className='dock-layout'>
          <div className='dock-box dock-vbox' style={{position: 'absolute', left: 100, top: 100, width: 600, height: 300}}>
            <DockBox size={1} boxData={box}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));