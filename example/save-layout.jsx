import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let tab1 = {id: 't1', title: 'Tab 1', content: <div>Tab 1</div>};
let tab2 = {id: 't2', title: 'Tab 2', content: <div>Tab 2</div>};
let tab3 = {id: 't3', title: 'Tab 3', content: <div>Tab 3</div>};
let tab4 = {id: 't4', title: 'Tab 4', content: <div>Tab 4</div>};
let tab5 = {id: 't5', title: 'Tab 5', content: <div>Tab 5</div>};
let tab6 = {id: 't6', title: 'Tab 6', content: <div>Tab 6</div>};

let defaultLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [tab1, tab2],
          },
          {
            tabs: [tab3, tab4],
          }
        ]
      },
      {
        tabs: [tab5, tab6],
      },
    ]
  }
};
let panelLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{id: 't1'}, {id: 't2'}, {id: 't3'}, {id: 't4'}, {id: 't5'}, {id: 't6'}],
      },
    ]
  }
};
let horizontalLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {tabs: [{id: 't1'}]},
      {tabs: [{id: 't2'}]},
      {tabs: [{id: 't3'}]},
      {tabs: [{id: 't4'}]},
      {tabs: [{id: 't5'}]},
      {tabs: [{id: 't6'}]},
    ]
  }
};

class Demo extends React.Component {
  getRef = (r) => {
    this.dockLayout = r;
  };

  state = {saved: null};

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={defaultLayout}
                    style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}}/>
        <div className='top-panel'>
          Save Layout:
          <button style={{marginRight: 20}}
                  onClick={() => this.setState({saved: this.dockLayout.saveLayout()})}>
            Save
          </button>
          Load Layout:
          <button onClick={() => this.dockLayout.loadLayout(horizontalLayout)}>
            Horizontal
          </button>
          <button onClick={() => this.dockLayout.loadLayout(panelLayout)}>
            Single Panel
          </button>
          <button disabled={this.state.saved == null} onClick={() => this.dockLayout.loadLayout(this.state.saved)}>
            Saved Layout
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
