import React from 'react';
import ReactDOM from 'react-dom';
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout} from '../lib';

let groups = {
  'locked': {
    floatable: false,
    tabLocked: true
  }
};

function getTab(id, value) {
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

class Demo extends React.Component {
  getRef = (r) => {
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
    let panelData = this.dockLayout.find('my_panel');
    ++this.count;
    let newTab = getTab(`tab${this.count}`, this.count)
    this.dockLayout.dockMove(newTab, panelData, 'middle');
  };
  defaultLayout = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          tabs: [
            {
              id: 'id2', title: 'change', content: (
                <div>
                  <p>Click here to change the other panel.</p>
                  <button onClick={this.addValue}>Update Value</button>
                  <button onClick={this.addTab}>Add Tab</button>
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

  state = {saved: null};

  render() {
    return (
      <DockLayout ref={this.getRef} defaultLayout={this.defaultLayout} groups={groups}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
