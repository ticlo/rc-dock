import React from 'react';
import ReactDOM from 'react-dom';

import {DockTabs} from "../src/DockTab";
import {TabGroup} from "../src/DockData";

let group: TabGroup = {
  closable: true
};
let tabs = [{
  id: 'hello',
  title: 'hello',
  content: <span style={{margin: 50}}>hello</span>,
  group
}, {
  id: 'world',
  title: 'world',
  content: <span style={{margin: 50}}>world</span>,
  group
},
];

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
          <div className='dock-panel'
               style={{position: 'absolute', left: 100, top: 100, width: 300, height: 300}}>
            <DockTabs onTabChange={this.onTabChange} tabs={tabs} group={group} activeId={this.state.activeId}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));