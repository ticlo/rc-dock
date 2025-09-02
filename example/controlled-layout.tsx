import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {htmlTab, tsxTab} from "./prism-tabs";
import {DockLayout, LayoutBase, TabBase, TabData, DropDirection} from '../src';

let tab0 = {
  title: 'Controlled Layout',
  content: (
    <div>
      <p>When you use <b>layout</b> instead of <b>defaultLayout</b> on &lt;DockLayout&gt;</p>
      <p>DockLayout will work as a controlled component</p>
    </div>
  )
};

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{id: 't0'}, htmlTab, tsxTab],
          },
          {
            tabs: [{id: 'protect1'}, {id: 't4'}, {id: 't5'}, {id: 't6'}],
          }
        ]
      },
      {
        tabs: [{id: 't7'}, {id: 't8'}, {id: 't9'}],
      },
    ]
  }
};

interface DemoState {
  layout: LayoutBase;
}

class Demo extends React.Component<{}, DemoState> {
  state: DemoState = {layout: box as LayoutBase};

  loadTab = (data: TabBase): TabData => {
    let {id} = data;
    switch (id) {
      case 't0':
        return {...tab0, id};
      case 'protect1' :
        return {
          id, title: 'Protect',
          closable: true,
          content: <div>
            <p>Removal of this tab will be rejected</p>
            This is done in the onLayoutChange callback
          </div>
        };
      case tsxTab.id:
        return tsxTab;
      case htmlTab.id:
        return htmlTab;
    }

    return {
      id, title: id,
      content: <div>Tab Content</div>
    };
  };

  onLayoutChange = (newLayout: LayoutBase, currentTabId?: string, direction?: DropDirection) => {
    // control DockLayout from state
    console.log(currentTabId, newLayout, direction);
    if (currentTabId === 'protect1' && direction === 'remove') {
      alert('removal of this tab is rejected');
    } else {
      this.setState({layout: newLayout});
    }
  };

  render() {
    return (
      <DockLayout layout={this.state.layout} loadTab={this.loadTab} onLayoutChange={this.onLayoutChange}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);
