import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout, DockContextType, DragStore} from '../lib';

let group = {
  floatable: true,
  closable: true,
  panelExtra: (panelData, context) => (
    <div className='my-panel-close-btn'
         onClick={() => context.dockMove(panelData, null, 'remove')}>
      X
    </div>
  )
};

let tab = {
  title: 'Tab',
  content: (
    <div>
      <p>Custom component can be added to panel's title bar.</p>
      <p>This panel has a close all button</p>
    </div>),
  group: 'close-all'
};

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 300,
        children: [
          {
            tabs: [{...tab, id: 't1'}, {...tab, id: 't2'}],
          },
          {
            tabs: [{...tab, id: 't3'}, {...tab, id: 't4'}],
          },
        ]
      },
      {
        size: 500,
        tabs: [{...tab, id: 't5'}, {...tab, id: 't6'}],
      },
      {
        size: 300,
        tabs: [{...tab, id: 't8'}],
      },
    ]
  },
  groups: {
    'close-all': group
  }
};

let count = 0;

class Demo extends React.Component {

  onDragNewTab = (e) => {
    let content = `New Tab ${count++}`;
    DragStore.dragStart(DockContextType, {
      tab: {
        id: content,
        content: <div style={{padding: 20}}>{content}</div>,
        title: content,
        group: 'close-all',
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
