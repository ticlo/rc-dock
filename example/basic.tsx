import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {tsxTab, htmlTab} from './prism-tabs';
import {DockLayout, LayoutBase} from '../src';

let tab = {
  content: <div>Tab Content</div>,
  closable: true,
};

let tabs = {
  t1: {...tab, title: 'Tab 1'},
  t2: {...tab, title: 'Tab 2'},
  t3: {
    ...tab, title: 'Min Size', minWidth: 150, minHeight: 150,
    content: <div><p>This tab has a minimal size</p>150 x 150 px</div>,
  },
  t4: {...tab, title: 'Tab 4'},
  t5: {
    ...tab, title: 'basic demo',
    content: <div>This panel won't be removed from layout even when last Tab is closed</div>,
  },
  t8: {...tab, title: 'Tab 8'},
  t9: {...tab, title: 'Tab 9', content: <div>Float</div>},
  t10: {...tab, title: 'Tab 10'},
  tsxTab,
  htmlTab,
};

let layout: LayoutBase = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          size: 200,
          children: [
            {
              tabs: [{id: 't1'}, {id: 't2'}],
            },
            {
              tabs: [{id: 't3'}, {id: 't4'}],
            },
          ]
        },
        {
          size: 1000,
          tabs: [{id: 't5'}, {id: 'tsxTab'}, {id: 'htmlTab'}],
          panelLock: {panelStyle: 'main'},
        },
        {
          size: 200,
          tabs: [{id: 't8'}],
        },
      ]
    },
    floatbox: {
      mode: 'float',
      children: [
        {
          tabs: [
            {id: 't9'},
            {id: 't10'}
          ],
          x: 300, y: 150, w: 400, h: 300
        }
      ]
    }
  }
;
if (window.innerWidth < 600) {
  // remove a column for mobile
  layout.dockbox.children.pop();
}

let count = 0;

class Demo extends React.Component {

  onDragNewTab = (e: React.DragEvent) => {
    let content = `New Tab ${count++}`;
    // Note: DragStore functionality has been removed. 
    // This example needs to be updated to use the new drag API.
    console.log('Drag functionality needs to be reimplemented', content);
  };

  render() {
    return (
      <DockLayout defaultLayout={layout} tabs={tabs} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);
