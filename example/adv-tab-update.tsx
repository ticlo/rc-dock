import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout, PanelData} from '../src';

let groups = {
  'locked': {
    floatable: false,
    tabLocked: true
  }
};

function getTab(id: string, value: number) {
  return {
    id,
    content: (
      <div>
        <p>It's easier to use React Context to update tab,<br/>
          but in some use cases you might need to directly update the tab.</p>
        {
          id !== `tab${value}` ?
            <p>Only current active tab will be changed</p>
            : null
        }
        value is {value}
      </div>
    ),
    title: id,
    group: 'locked',
  }
}

interface DemoState {
  saved: any;
}

class Demo extends React.Component<{}, DemoState> {
  dockLayout: DockLayout;
  
  getRef = (r: DockLayout) => {
    this.dockLayout = r;
  };

  count = 4;
  addValue = () => {
    let panelData = this.dockLayout.find('my_panel');
    let tabId = panelData.activeId;
    // docklayout will find the same tab id and replace the previous tab
    this.dockLayout.updateTab(tabId, getTab(tabId, ++this.count));
  };
  addTab = () => {
    ++this.count;
    let newTab = getTab(`tab${this.count}`, this.count)
    this.dockLayout.dockMove(newTab, 'my_panel', 'middle');
  };
  defaultLayout: any = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          tabs: [
            {
              id: 'id2', title: 'change', content: (
                <div>
                  <p>Click here to change the other panel.</p>
                  <button className='btn' onClick={this.addValue}>Update Value</button>
                  <button className='btn' onClick={this.addTab}>Add Tab</button>
                </div>
              )
            },
            jsxTab,
            htmlTab
          ],
        },
        {
          id: 'my_panel',
          tabs: [getTab('tab1', 1), getTab('tab2', 2), getTab('tab3', 3), getTab('tab4', 4)],
        },
      ]
    }
  };

  state: DemoState = {saved: null};

  render() {
    return (
      <DockLayout ref={this.getRef} defaultLayout={this.defaultLayout} groups={groups}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);
