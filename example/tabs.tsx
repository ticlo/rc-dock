import React from 'react';
import ReactDOM from 'react-dom';

import {DockTabs} from "../src/DockTabs";
import {PanelData, TabData, TabGroup} from "../src/DockData";
import {DockPanel} from "../src/DockPanel";

let group: TabGroup = {
  closable: true
};
let panel: PanelData = {
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
  id: 'hello world',
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
        <div className='dock-root'>
          <div style={{position: 'absolute', left: 100, top: 100, width: 300, height: 300}}>
            <DockPanel size={1} panelData={panel}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));