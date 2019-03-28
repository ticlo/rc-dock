import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout, DockContextType, DragStore} from '../lib';

let tab = {
  content: <div>Tab Group 2</div>,
  closable: true,
};

let box = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          size: 200,
          children: [
            {
              tabs: [{...tab, id: 't1', title: 'Tab 1'}, {...tab, id: 't2', title: 'Tab 2'}],
            },
            {
              tabs: [{
                ...tab, id: 't3', title: 'Min Size', content: (
                  <div>
                    <p>This tab has a minimal size</p>
                    200 x 200 px
                  </div>
                ), minWidth: 200, minHeight: 200,
              }, {...tab, id: 't4', title: 'Tab 4'}],
            },
          ]
        },
        {
          size: 1000,
          tabs: [
            {
              ...tab, id: 't5', title: 'basic demo', content: (
                <div>
                  This panel won't be removed from layout even when last Tab is closed
                </div>
              ),
            },
            {...tab, id: 't6', title: 'Tab 6'},
            {...tab, id: 't7', title: 'Tab 7'}
          ],
          panelLock: {panelClass: 'dock-panel-main-locked'},
        },
        {
          size: 200,
          tabs: [{...tab, id: 't8', title: 'Tab 8'}],
        },
      ]
    },
    floatbox: {
      mode: 'float',
      children: [
        {
          tabs: [
            {...tab, id: 't8', title: 'Tab 8', content: <div>Float</div>},
            {...tab, id: 't9', title: 'Tab 9'}
          ],
          x: 300, y: 150, w: 400, h: 300
        }
      ]
    }
  }
;

let count = 0;

class Demo extends React.Component {

  onDragNewTab = (e) => {
    let content = `New Tab ${count++}`;
    DragStore.dragStart(DockContextType, {
      tab: {
        id: content,
        content: <div style={{padding: 20}}>{content}</div>,
        title: content,
        closable: true,
      }
    }, e.nativeEvent);
  };

  render() {
    return (
      <div style={{margin: 20}}>
        <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 180, bottom: 10}}/>
        <div className='side-panel'>
          <button draggable={true} onDragStart={this.onDragNewTab}>
            Drag a new Tab from here
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
