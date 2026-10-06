import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {htmlTab, tsxTab} from "./prism-tabs";
import {DockLayout, LayoutBase} from '../src';

let tabs = {
  t1: {title: 'Tab 1', content: <div>Tab 1</div>},
  t2: {title: 'Tab 2', content: <div>Tab 2</div>},
  t3: {title: 'Tab 3', content: <div>Tab 3</div>},
  t4: {title: 'Tab 4', content: <div>Tab 4</div>},
  t5: {title: 'Tab 5', content: <div>Tab 5</div>},
  t6: {title: 'Tab 6', content: <div>Tab 6</div>},
  tsxTab,
  htmlTab,
};

let defaultLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{id: 't1'}, {id: 'tsxTab'}, {id: 'htmlTab'}],
          },
          {
            tabs: [{id: 't2'}, {id: 't3'}, {id: 't4'}],
          }
        ]
      },
      {
        tabs: [{id: 't5'}, {id: 't6'}],
      },
    ]
  }
};
let panelLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{id: 't1'}, {id: 't2'}, {id: 't3'}, {id: 't4'}, {id: 't5'}, {id: 't6'}, {id: 'tsxTab'}, {id: 'htmlTab'}],
      },
    ]
  }
};
let horizontalLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {tabs: [{id: 't1'}, {id: 'tsxTab'}, {id: 'htmlTab'}]},
      {tabs: [{id: 't2'}]},
      {tabs: [{id: 't3'}]},
      {tabs: [{id: 't4'}]},
      {tabs: [{id: 't5'}]},
      {tabs: [{id: 't6'}]},
    ]
  }
};

interface DemoState {
  saved: LayoutBase | null;
}

class Demo extends React.Component<{}, DemoState> {
  dockLayout: DockLayout;
  
  getRef = (r: DockLayout) => {
    this.dockLayout = r;
  };

  state: DemoState = {saved: null};

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={defaultLayout} tabs={tabs}
                    style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}}/>
        <div className='top-panel'>
          Save Layout:
          <button className='btn' style={{marginRight: 20}}
                  onClick={() => this.setState({saved: this.dockLayout.saveLayout()})}>
            Save
          </button>
          Load Layout:
          <button className='btn' onClick={() => this.dockLayout.loadLayout(horizontalLayout)}>
            Horizontal
          </button>
          <button className='btn' onClick={() => this.dockLayout.loadLayout(panelLayout)}>
            Single Panel
          </button>
          <button className='btn' disabled={this.state.saved == null} onClick={() => this.dockLayout.loadLayout(this.state.saved!)}>
            Saved Layout
          </button>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);
