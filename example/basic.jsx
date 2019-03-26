import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout, DockContextType, DragStore} from '../lib';

let fixGroup = {
  floatable: true,
};
let closableGroup = {
  floatable: true,
  animate: false
};

let fixTab = {
  content: (
    <div>Tab Group 1</div>
  ),
  group: fixGroup
};

let closableTab = {
  content: <div>Tab Group 2</div>,
  closable: true,
  group: closableGroup
};

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...fixTab, id: 't1', title: 'tab 1'}, {...fixTab, id: 't2', title: 'tab 2'}],
          },
          {
            tabs: [{...fixTab, id: 't3', title: 'tab 3'}, {...fixTab, id: 't4', title: 'tab 4'}],
          },
        ]
      },
      {
        tabs: [
          {
            ...closableTab, id: 't5', title: 'basic demo', content: (
              <div>
                This panel won't be removed from layout even when last tab is closed
              </div>
            ),
          },
          {...closableTab, id: 't6', title: 'tab 6'},
          {...closableTab, id: 't7', title: 'tab 7'}
        ],
        panelLocked: true,
      },
    ]
  },
  floatbox: {
    mode: 'float',
    children: [
      {
        tabs: [{...fixTab, id: 't8', title: 'tab 8'}, {...fixTab, id: 't9', title: 'tab 9'}],
        x: 40, y: 40, w: 400, h: 300
      }
    ]
  }
};

let count = 0;

class Demo extends React.Component {

  render() {
    return (
      <div style={{margin: 20}}>
        <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 180, bottom: 10}}/>

        <div className='dragMe' draggable={true} onDragStart={(e) => {
          let content = `New Tab ${count++}`;
          DragStore.dragStart(DockContextType, {
            tab: {
              id: content,
              content: <div style={{padding: 20}}>{content}</div>,
              title: content,
              closable: true,
              group: closableGroup
            }
          });
        }}>
          drag me <br/>to <br/>create new tab
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
