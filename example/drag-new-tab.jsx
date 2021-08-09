import React from 'react';
import ReactDOM from 'react-dom';
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout, DragDropDiv} from '../lib';

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
  getRef = (r) => {
    this.dockLayout = r;
  };
  getButtonRef = (r) => {
    this.buttonRef = r;
  }

  onDragStart = (e) => {
    console.log(this.dockLayout, this.buttonRef)
    e.setData({
      tab: {...tab, id: `newTab-${++this.newTabId}`},
      // panel: {
      //   group: '', // define your tab group here if needed
      // },
      panelSize: [400, 300]
    }, this.dockLayout.getDockId());
    e.startDrag(this.buttonRef.element, this.buttonRef.element);
  };

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={box}
                    style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}}/>
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

ReactDOM.render(<Demo/>, document.getElementById('app'));
