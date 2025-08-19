import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from "react-dom/client";
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout, DragDropDiv, DragState} from '../src';

let tab = {
  title: 'Tab',
  content: <div>Tab Content</div>
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [jsxTab, htmlTab],
          },
          {
            tabs: [{...tab, id: 't4'}, {...tab, id: 't5'}, {...tab, id: 't6'}],
          }
        ]
      },
      {
        tabs: [{...tab, id: 't7'}, {...tab, id: 't8'}, {...tab, id: 't9'}]
      },
    ]
  }
};

class Demo extends React.Component {
  newTabId = 0;
  dockLayout: DockLayout;
  buttonRef: DragDropDiv;

  getRef = (r: DockLayout) => {
    this.dockLayout = r;
  };
  getButtonRef = (r: DragDropDiv) => {
    this.buttonRef = r;
  }

  onDragStart = (e: DragState) => {
    e.setData({
      tab: {...tab, id: `newTab-${++this.newTabId}`},
      panelSize: [400, 300]
    }, this.dockLayout.getDockId());
    e.startDrag(this.buttonRef.element, this.buttonRef.element);
  };

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={box}
          style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}} />
        <div className='top-panel'>
          <DragDropDiv ref={this.getButtonRef} onDragStartT={this.onDragStart}>
            <button className='btn'>
              Drag Me to Create New Tab
            </button>
          </DragDropDiv>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo /></React.StrictMode>);
