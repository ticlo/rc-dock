import React from 'react';
import ReactDOM from 'react-dom';

import {DockTabs} from "../src/DockTabs";
import {BoxData, DockContextType, LayoutData, PanelData, TabData, TabGroup} from "../src/DockData";
import {DockPanel} from "../src/DockPanel";
import {DockBox} from "../src/DockBox";
import {DockLayout} from "../src/DockLayout";
import {DragStore} from "../src/DragStore";

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
          content: <div style={{padding: 20}}>hello</div>,
          group
        }, {
          id: 'world2',
          title: 'world',
          content: <div style={{padding: 20}}>world</div>,
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
          content: <div style={{padding: 20}}>hello</div>,
          group
        }, {
          id: 'world4',
          title: 'world',
          content: <div style={{padding: 20}}>world</div>,
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
          content: <span style={{padding: 20}}>hello</span>,
          group
        }, {
          id: 'world6',
          title: 'world',
          content: <span style={{padding: 20}}>world</span>,
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

let count = 0;

class Demo extends React.Component<any, State> {
  state = {activeId: 'world'};

  onTabChange = (activeId: string) => {
    this.setState({activeId});
  };

  render() {
    return (
      <div style={{margin: 20}}>
        <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 200, bottom: 10}}/>

        <div className='dragMe' draggable={true} onDragStart={(e) => {
          let content = `New Tab ${count++}`;
          DragStore.dragStart(DockContextType, {
            tab: {
              id: content,
              content: <div style={{padding: 20}}>{content}</div>,
              title: content,
              group
            }
          });
        }} style={{}}>New Tab
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));